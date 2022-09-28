/// <reference types="cypress" />

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

  it('if the table start empty' , () => {
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
    cy.get('[data-testid="element-span-search-button"]').click();
    cy.get('[data-testid="element-table-tbody"]', { timeout: 5000 }).should('not.be.empty');
    cy.get('[data-testid="element-table-td-authors"]').should('not.have.length.greaterThan', 10);
  });

  it('if the pagination works correctly', () => {
    cy.visit('http://localhost:3000/search/1');
    cy.get('[data-testid="pagination"]').should('not.exist');
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