import { page } from '../support/utils/common.js';

describe('Product details', () => {
    it('should have "ProductCard" as a link to the details page', () => {
        page.getProduct();

        cy.url()
            .should('contain', 'motorola-xoom-with-wi-fi');
    });

    it('shuld show product description on the page', () => {
        cy.intercept('**products.json', { fixture: 'oneProduct' });

        cy.fixture('productDetails.json')
            .as('prodDetails');

        cy.visit('/');

        cy.get('@prodDetails').then((prodDetails) => {
            cy.get('a[href*="motorola"]')
                .click();

            cy.getByDataCy('productDescription')
                .should('contain', prodDetails.description);
        });
    });

    it('should have "You may also like" implemented', () => {
        page.getProduct();

        cy.contains('You may also like');
    });

    it('should have "Back" button implemented', () => {
        page.getProduct();

        cy.getByDataCy('backButton')
            .click();

        cy.url()
            .should('eq', 'http://localhost:3000/#/');
    });

    it('should have "Breadcrumbs" element implemented', () => {
        page.getProduct();

        cy.getByDataCy('breadCrumbs')
            .find('a[href="#/"]');

        cy.getByDataCy('breadCrumbs')
            .find('a[href="#/tablets"]');
    });
});
