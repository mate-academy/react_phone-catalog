import { page } from '../support/utils/common.js';

describe('Phones page', () => {
    it('should have "ProductsList" showing all the "phones"', () => {
        page.selectPhonesOnPage(2, 4, 5);

        cy.intercept('**products.json', { fixture: 'differentProds' });

        cy.fixture('differentProds.json').as('prods');

        cy.visit('#/phones');

        page.assertValue('have.length', 3);
    });

    it('should have option to sort the products by "age"', () => {
        page.selectPhonesOnPage(2, 4, 5, 'age', true);
    });

    it('should have option to sort the products by"name"', () => {
        page.selectPhonesOnPage(5, 2, 4, 'name', true);
    });

    it('should have option to sort the products by "price"', () => {
        page.selectPhonesOnPage(5, 2, 4, 'price', true);
    });

    it('should have "Pagination" implemented', () => {
        cy.intercept('**products.json', { fixture: 'limit' });

        cy.visit('#/phones');

        page.select(1, '4');

        page.assertValue('not.contain', 'LG Axis');

        page.clickButton('2');

        page.assertValue('contain', 'LG Axis');

        cy.getByDataCy('paginationLeft')
            .click();

        page.assertValue('contain', 'Dell Venue');
    });

    it('should have limit the number of products on the page option', () => {
        cy.intercept('**products.json', { fixture: 'limit' });

        cy.visit('#/phones');

        page.select(1, '4');

        page.assertValue('have.length', 4);

        page.select(1, '8');

        page.assertValue('have.length', 8);

        page.select(1, '16');

        page.assertValue('have.length', 16);
    });

    it('shouold hide all the pagination elements if there are a few items', () => {
        cy.visit('#/phones');

        page.select(1, '8');

        cy.getByDataCy('pagination');

        page.select(1, 'all');

        page.assertValue('have.length', 16);

        cy.getByDataCy('pagination')
            .should('not.exist');
    });
});
