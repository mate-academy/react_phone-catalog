describe('Tablets and accessories', () => {
  it('should show only tablets on the "TabletsPage"', () => {
    cy.intercept('**products.json', { fixture: 'differentProds' });

    cy.fixture('differentProds.json').as('prods');

    cy.visit('#/tablets');

    cy.get('@prods')
      .then((prods) => {
        const assertProcuctCard = (cardIndex, item) => {
          cy.getByDataCy('productList')
            .children()
            .eq(cardIndex)
            .contains(prods[item].name);
        }

        assertProcuctCard(0, 0);

        assertProcuctCard(1, 1);

        assertProcuctCard(2, 3);
      });

    cy.getByDataCy('productList')
      .children()
      .should('have.length', 3);
  });

  it('should have "AccessoriesPage" implemented', () => {
    cy.visit('#/accessories');

    cy.get('h1')
      .contains('Accessories');
  });

  it('should have "NoResults" component implemented', () => {
    cy.intercept('**products.json', { fixture: 'noProducts' });

    cy.visit('#/tablets');

    cy.contains('Tablets not found');
  });
});
