import { page } from '../support/utils/common.js';

const phone = 'Motorola XOOM™ with Wi-Fi';

describe('Favorites', () => {
    it('should show the list with all the favorite products', () => {
        page.addToFavorites();

        cy.url()
            .should('eq', 'http://localhost:3000/#/favorites');

        cy.contains(phone);
    });

    it('should have an option to remove a favorite item by pressing a "heart"', () => {
        page.addToFavorites();

        cy.contains(phone);

        cy.getByDataCy('addToFavorite')
            .click();

        cy.reload();

        cy.contains(phone)
            .should('not.exist');
    });
});
