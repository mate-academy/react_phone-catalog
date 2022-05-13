import { page } from '../support/utils/common.js';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.fixture('phones.json')
      .as('phones');
  });

  it('should have buttons "<" and ">" to scroll banner images', () => {
    cy.get('[class="Slider-Image"]')
      .eq(0)
      .invoke('attr', 'src')
      .then((src) => {
        cy.get('[data-cy="sliderButtonLeft"]')
          .click({ force: true });

        cy.get('[class="Slider-Image"]')
          .eq(0)
          .invoke('attr', 'src')
          .should('not.eq', src)
          .then(() => {
            cy.get('[data-cy="sliderButtonRight"]')
              .click({ force: true });

            cy.get('[class="Slider-Image"]')
              .eq(0)
              .invoke('attr', 'src')
              .should('eq', src);
          });
      });
  });

  it('should have "Hot prices" block implemented', () => {
    page.checkPhonesOnPage(4, 5, 3, 0, 'hotPrices');
  });

  it('should have "Brand new" block implemented', () => {
    page.checkPhonesOnPage(1, 2, 0, 1, 'brandNew');
  });

  it('should have "Shop by category" block implemented', () => {
    cy.get('.ShopByCategory-Categories')
      .within(() => {
        cy.get('[href="#/phones"]');

        cy.get('[href="#/tablets"]');

        cy.get('[href="#/accessories"]');
      })
  });
});
