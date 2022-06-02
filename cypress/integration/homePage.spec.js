import { page } from '../support/utils/common.js';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.fixture('phones.json')
      .as('phones');
  });

  it('should have "Hot prices" block implemented', () => {
    page.checkPhonesOnPage(4, 5, 3, 0, 'hotPrices');
  });

  it('should have "Brand new" block implemented', () => {
    page.checkPhonesOnPage(1, 2, 0, 1, 'brandNew');
  });

  it('should have "Shop by category" block implemented', () => {
    cy.getByDataCy('categoryLinksContainer')
      .within(() => {
        cy.get('[href="#/phones"]');

        cy.get('[href="#/tablets"]');

        cy.get('[href="#/accessories"]');
      })
  });
});
