export const page = {
    getProduct() {
        cy.intercept('**products.json', { fixture: 'oneProduct' });

        cy.visit('/');

        cy.get('a[href*="motorola"]')
            .click();
    },

    selectPhonesOnPage(phone1, phone2, phone3, selectOption, useSelect) {
        cy.intercept('**products.json', { fixture: 'differentProds' });

        cy.fixture('differentProds.json').as('prods');

        cy.visit('#/phones').then(() => {

            if (useSelect) {
                cy.get('select')
                    .first()
                    .select(selectOption);

                cy.get('@prods').then((prods) => {
                    cy.getByDataCy('productList')
                        .children()
                        .eq(0)
                        .contains(prods[phone1].name);

                    cy.getByDataCy('productList')
                        .children()
                        .eq(1)
                        .contains(prods[phone2].name);

                    cy.getByDataCy('productList')
                        .children()
                        .eq(2)
                        .contains(prods[phone3].name);
                });
            } else {
                cy.get('@prods').then((prods) => {
                    cy.getByDataCy('productList')
                        .children()
                        .eq(0)
                        .contains(prods[phone1].name);

                    cy.getByDataCy('productList')
                        .children()
                        .eq(1)
                        .contains(prods[phone2].name);

                    cy.getByDataCy('productList')
                        .children()
                        .eq(2)
                        .contains(prods[phone3].name);
                });
            }
        });
    },

    checkPhonesOnPage(phone1, phone2, phone3, elemIndex, fixture) {
        cy.intercept('**products.json', { fixture: fixture });

        cy.visit('/');

        cy.get('@phones').then((phones) => {
            cy.getByDataCy('cardsContainer')
                .eq(elemIndex)
                .children()
                .eq(0)
                .contains(phones[phone1].name);

            cy.getByDataCy('cardsContainer')
                .eq(elemIndex)
                .children()
                .eq(1)
                .contains(phones[phone2].name);

            cy.getByDataCy('cardsContainer')
                .eq(elemIndex)
                .children()
                .eq(2)
                .contains(phones[phone3].name);
        })
    },

    addToFavorites() {
        cy.intercept('**products.json', { fixture: 'oneProduct' });

        cy.visit('/');

        cy.getByDataCy('addToFavorite')
            .click();

        cy.get('a[href*="favorites"]')
            .click();
    },

    addToCart() {
        cy.intercept('**products.json', { fixture: 'oneProduct' });

        cy.visit('/');

        cy.contains('Add to cart')
            .click();

        cy.get('a[href*="cart"]')
            .click();
    },

    clickButton(text) {
        cy.get('button')
            .contains(text)
            .click();
    },

    select(index, value) {
        cy.get('select')
            .eq(index)
            .select(value);
    },

    assertValue(assert, value) {
        cy.getByDataCy('productList')
            .children()
            .should(assert, value);
    },
}
