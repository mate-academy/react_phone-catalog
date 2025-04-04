describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should have h1', () => {
    cy.get('h1').should('have.text', 'Product Catalog');
  });
});
