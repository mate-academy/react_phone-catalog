describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a header with links to all the pages', () => {
    cy.get('header [href="#/"]').should('exist');
    cy.get('header [href="#/phones"]').should('exist');
    cy.get('header [href="#/tablets"]').should('exist');
    cy.get('header [href="#/accessories"]').should('exist');
    cy.get('header [href="#/favorites"]').should('exist');
    cy.get('header [href="#/cart"]').should('exist');
  });

  it('should have Github link in the footer', () => {
    cy.get('footer [href*="github.com"]').should('exist');
  });
});
