const reqValue = 'https://core.ac.uk/api-v2/articles/search?metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=5iA87XUqKRFwlIpkYTz1O6mrLnJevGhj';

describe('empty spec', () => {
  it('if the header contains the correct information', () => {
    cy.visit('http://localhost:3000/favorites/1');
    cy.get('[data-testid="element-navbar-link-search"]').should('have.text', 'Home Page');
    cy.get('[data-testid="element-navbar-link-search"]').click();
    cy.url().should('include', 'http://localhost:3000/search/1');
    cy.get('[data-testid="element-navbar-link-favorites"]').should('have.text', 'Favorites');
    cy.get('[data-testid="element-navbar-link-favorites"]').click();
    cy.url().should('include', 'http://localhost:3000/favorites/1');
  });

  it('if the table start empty' , () => {
    cy.visit('http://localhost:3000/favorites/1');
    cy.get('[data-testid="element-table-th-authors"]').should('have.text', 'Authors');
    cy.get('[data-testid="element-table-th-type"]').should('have.text', 'Type');
    cy.get('[data-testid="element-table-th-description"]').should('have.text', 'Description');
    cy.get('[data-testid="element-table-th-urls"]').should('have.text', 'URLs');
    cy.get('[data-testid="element-table-th-favorite"]').should('have.text', 'Favorite');
    cy.get('[data-testid="element-table-tbody"]').should('be.empty');
  });

  it('if after favorite on search page the articles appear on favorites page', () => {
    cy.visit('http://localhost:3000/search/1');
    cy.fixture('firstpagearticles').then(function(firstPageArticles) {
      cy.intercept('POST', reqValue, {
        status: 200,
        body: firstPageArticles
      }).as('firstPageArticles');
      cy.get('[data-testid="element-span-search-button"]').click();
      cy.wait('@firstPageArticles', {timeout: 10000});
    });
    cy.get('[data-testid="element-span-search-button"]').click();
    cy.get('[data-testid="element-favorite-index-0"]', { timeout: 5000 }).click();
    cy.get('[data-testid="element-favorite-index-1"]', { timeout: 5000 }).click();
    cy.get('[data-testid="element-favorite-index-5"]', { timeout: 5000 }).click();
    cy.get('[data-testid="element-navbar-link-favorites"]').click();
    cy.get('[data-testid="element-favorite-index-0"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="element-favorite-index-1"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="element-favorite-index-2"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="element-favorite-index-2"]').click();
    cy.get('[data-testid="element-favorite-index-1"]').click();
    cy.get('[data-testid="element-favorite-index-0"]').click();
    cy.get('[data-testid="element-favorite-index-0"]').should('not.exist');
    cy.get('[data-testid="element-favorite-index-1"]').should('not.exist');
    cy.get('[data-testid="element-favorite-index-2"]').should('not.exist');
  });
});