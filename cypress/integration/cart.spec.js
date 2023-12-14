import { page } from '../support/utils/common.js';

describe('Cart', () => {
    it('should have "Add to cart" button to add a product to the "Cart"', () => {
        page.addToCart();

        cy.url()
            .should('eq', 'http://localhost:3000/#/cart');

        cy.contains('Motorola XOOM™ with Wi-Fi');
    });

    it('should change "Add to cart" button to "Added to cart" after adding a product to the "Cart"', () => {
        cy.visit('/');

        cy.contains('Add to cart')
            .click();

        cy.contains('Added to cart');
    });

    it('should have option to remove a product from "Cart" with "x" button', () => {
        page.addToCart();

        cy.contains('Motorola XOOM™ with Wi-Fi');

        cy.getByDataCy('cartDeleteButton')
            .click();

        cy.contains('Your cart is empty');
    });

    it('should have option to change quantity with "-" and "+" buttons', () => {
        page.addToCart();

        cy.contains('Motorola XOOM™ with Wi-Fi');

        page.clickButton('+');

        cy.getByDataCy('productQauntity')
            .should('contain', 2);

        page.clickButton('-');

        cy.getByDataCy('productQauntity')
            .should('contain', 1);
    });

    it('should calculate total sum automatically ', () => {
        page.addToCart();

        cy.contains('Motorola XOOM™ with Wi-Fi');

        page.clickButton('+');

        cy.getByDataCy('productQauntity')
            .should('contain', 2);

        cy.contains(1560);
    });

    it('should show the error message after clicking  "Checkout"', () => {
        page.addToCart();

        cy.contains('Motorola XOOM™ with Wi-Fi');

        cy.contains('Checkout')
            .click();

        cy.contains('We are sorry, but this feature is not implemented yet');
    });
});
