import { page } from '../support/utils/common.js';

describe('Favorites', () => {
    it('should show the list with all the favorite products', () => {
        page.addToFavorites();

        cy.url()
            .should('eq', 'http://localhost:3000/#/favorites');

        cy.contains('Motorola XOOM™ with Wi-Fi');
    });

    it('should have an option to remove a favorite item by pressing a "hart"', () => {
        page.addToFavorites();

        cy.contains('Motorola XOOM™ with Wi-Fi');

        cy.getByDataCy('addToFavorite')
            .click();

        cy.reload();

        cy.contains('Motorola XOOM™ with Wi-Fi')
            .should('not.exist');
    });
});
