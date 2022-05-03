describe('Search', () => {
  beforeEach(() => {
    cy.intercept('**products.json', { fixture: 'phones' });

    cy.visit('/#/phones');

    cy.get('.Header')
      .find('input')
      .as('search');
  });

  it('should not be shown on the "Home" page', () => {
    cy.visit('/');

    cy.get('@search')
      .should('not.exist');
  });

  it('should be implemented', () => {
    cy.get('@search')
      .type('T-Mobile G2{enter}');

    cy.get('[data-cy="productList"]')
      .children()
      .should('have.length', 1)
      .contains('T-Mobile G2');
  });

  it('should have option to clear the input with "x" button', () => {
    cy.get('@search')
      .type('Moto')
      .should('have.value', 'Moto');

    cy.get('.Search-Delete')
      .click();

    cy.get('@search')
      .should('be.empty');
  });
});
