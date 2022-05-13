describe('Other tasks', () => {
  it('should have "NotFoundPage" for all the other URLs with the link to "HomePage"', () => {
    cy.visit('http://localhost:3000/#/foo');

    cy.contains('Page not found');
  });
});
