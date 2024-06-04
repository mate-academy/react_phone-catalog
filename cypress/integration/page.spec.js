describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have h1', () => {
    cy.get('h1').should('have.text', 'Welcome to Nice Gadgets store!');
  });
});
