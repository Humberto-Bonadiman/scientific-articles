/// <reference types="cypress" />

const api = 'https://core.ac.uk:443/api-v2/articles/search';
const valueReq = 'https://core.ac.uk/api-v2/articles/search?metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=5iA87XUqKRFwlIpkYTz1O6mrLnJevGhj';
const queryParams = '?metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false';
const allRequest = `${api}${queryParams}&apiKey=${Cypress.env('key')}`;

describe('Test search page', () => {

  it('if the header contains the correct information', () => {
    cy.visit('http://localhost:3000/search/1');
    cy.get('[data-testid="element-navbar-link-search"]').should('have.text', 'Home Page');
    cy.get('[data-testid="element-navbar-link-search"]').click();
    cy.url().should('include', 'http://localhost:3000/search/1');
    cy.get('[data-testid="element-navbar-link-favorites"]').should('have.text', 'Favorites');
    cy.get('[data-testid="element-navbar-link-favorites"]').click();
    cy.url().should('include', 'http://localhost:3000/favorites/1');
  });

  it('if the table start empty', () => {
    cy.visit('http://localhost:3000/search/1');
    cy.get('[data-testid="element-table-th-authors"]').should('have.text', 'Authors');
    cy.get('[data-testid="element-table-th-type"]').should('have.text', 'Type');
    cy.get('[data-testid="element-table-th-description"]').should('have.text', 'Description');
    cy.get('[data-testid="element-table-th-urls"]').should('have.text', 'URLs');
    cy.get('[data-testid="element-table-th-favorite"]').should('have.text', 'Favorite');
    cy.get('[data-testid="element-table-tbody"]').should('be.empty');
  });

  it('if the input and span has the correct information', () => {
    cy.visit('http://localhost:3000/search/1');
    cy.get('[data-testid="element-input-form-control"]').should('have.text', '');
    cy.get('[data-testid="element-span-search-button"]').should('have.text', 'Search');
    cy.get('[data-testid="element-input-form-control"]').type('title');
    cy.fixture('firstpagearticles').then(function(firstPageArticles) {
      cy.intercept('POST', valueReq, {
        status: 200,
        body: firstPageArticles
      }).as('firstPageArticles');
      cy.get('[data-testid="element-span-search-button"]').click();
      cy.wait('@firstPageArticles', {timeout: 10000});
    });
    cy.get('[data-testid="element-span-search-button"]').click();
    cy.get('[data-testid="element-table-tbody"]', { timeout: 5000 }).should('not.be.empty');
    cy.get('[data-testid="element-table-td-title"]').should('have.length', 10);
    cy.get('[data-testid="element-table-td-authors-0"]').should('have.text', 'Barclay, Kezia M.');
    cy.get('[data-testid="element-table-td-authors-1"]').should('have.text', 'Bosenbark, Danielle D.');
    cy.get('[data-testid="element-table-td-authors-2"]').should('have.text', 'Henry, Racine R.');
    cy.get('[data-testid="element-table-td-authors-3"]').should('have.text', 'Leahy, Laura Groblewski');
    cy.get('[data-testid="element-table-td-authors-4"]').should('have.text', 'Manturuk, Christine L.');
    cy.get('[data-testid="element-table-td-authors-5"]').should('have.text', 'Russon, Jody Moser');
    cy.get('[data-testid="element-table-td-authors-6"]').should('have.text', 'Gorsegner, Amanda');
    cy.get('[data-testid="element-table-td-authors-7"]').should('have.text', 'Johnson, Cristyn A.');
    cy.get('[data-testid="element-table-td-authors-8"]').should('have.text', 'Bennett, Patrick');
    cy.get('[data-testid="element-table-td-authors-9"]').should('have.text', 'Sunderaraman, Preeti');
  });

  it('if the pagination works correctly', () => {
    cy.visit('http://localhost:3000/search/1');
    cy.get('[data-testid="pagination"]').should('not.exist');
    cy.get('[data-testid="element-input-form-control"]').type('title');
    cy.fixture('firstpagearticles').then(function(firstPageArticles) {
      cy.intercept('POST', valueReq, {
        status: 200,
        body: firstPageArticles
      }).as('firstPageArticles');
      cy.get('[data-testid="element-span-search-button"]').click();
      cy.wait('@firstPageArticles', {timeout: 15000});
    });
    cy.get('[data-testid="element-span-search-button"]').click();
    cy.get('[data-testid="pagination"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="pagination-index-first-1"]', { timeout: 5000 }).should('have.text', '‹Previous');
    cy.get('[data-testid="pagination-index-1"]').should('have.text', '1(current)');
    cy.get('[data-testid="pagination-index-2"]', { timeout: 5000 }).should('have.text', '2');
    cy.get('[data-testid="pagination-index-5"]').should('have.text', '5');
    cy.get('[data-testid="pagination-index-last-6"]').should('have.text', '›Next');
    cy.get('[data-testid="pagination-index-first-1"]', { timeout: 5000 }).should('have.text', '‹Previous');
    cy.get('[data-testid="pagination-index-5"]').click();
    cy.get('[data-testid="pagination-index-5"]').should('have.text', '5(current)');
    cy.get('[data-testid="pagination-index-3"]').should('have.text', '3');
    cy.get('[data-testid="pagination-index-4"]').should('have.text', '4');
    cy.get('[data-testid="pagination-index-6"]').should('have.text', '6');
    cy.get('[data-testid="pagination-index-9"]').should('have.text', '9');
    cy.get('[data-testid="pagination-index-last-10"]').should('have.text', '›Next');
  });
});