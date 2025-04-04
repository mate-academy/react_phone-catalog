/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string): Cypress.Chainable<JQuery<HTMLElement>>;
      byDataCy<S extends JQuery<HTMLElement>>(
        name: string,
      ): Cypress.Chainable<S>;
    }
  }
}

Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// @ts-expect-error Incompatible types between subject and prevSubject in Cypress.Commands.add for 'byDataCy'
Cypress.Commands.add(
  'byDataCy',
  { prevSubject: ['optional', 'element'] },
  (
    subject:
      | Cypress.Chainable<JQuery<HTMLElement>>
      | JQuery<HTMLElement>
      | null,
    name: string,
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    const selector = `[data-cy="${name}"]`;
    return subject ? cy.wrap(subject).find(selector) : cy.get(selector);
  },
);

export {};
