describe('Tablets and accessories', () => {
    it.only('should show only tablets on the "TabletsPage"', () => {
      cy.intercept('**products.json', { fixture: 'differentProds' });

      cy.fixture('differentProds.json').as('prods');

      cy.visit('#/tablets');

      cy.get('@prods').then((prods) => {
          cy.getByDataCy('productList')
              .children()
              .eq(0)
              .contains(prods[0].name);

          cy.getByDataCy('productList')
              .children()
              .eq(1)
              .contains(prods[1].name);

          cy.getByDataCy('productList')
              .children()
              .eq(2)
              .contains(prods[3].name);
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
