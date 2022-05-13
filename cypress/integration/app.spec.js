describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have "Header" with links to all the pages implemented', () => {
    cy.get('.Header').within(() => {
      cy.get('[href="#/"]');

      cy.get('[href="#/phones"]');

      cy.get('[href="#/tablets"]');

      cy.get('[href="#/accessories"]');

      cy.get('[href="#/favorites"]');

      cy.get('[href="#/cart"]');
    })
  });

  it('should have Github link in the footer', () => {
    cy.get('.Footer')
      .find('a[href*="github.com"]');
  });
});
