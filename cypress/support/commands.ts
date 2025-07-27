/// <reference types="cypress" />
/// <reference types="jquery" />

// Типи для автодоповнення
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject = unknown> {
      getByDataCy(selector: string): Chainable<unknown>;
      byDataCy(name: string): Chainable<unknown>;
    }
  }
}

// @ts-expect-error - ігноруємо TypeScript помилки для команд
Cypress.Commands.add('getByDataCy', selector => {
  return cy.get(`[data-cy="${selector}"]`);
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
Cypress.Commands.add(
  'byDataCy',
  { prevSubject: 'optional' },
  (subject: JQuery<HTMLElement> | undefined, name: string) => {
    const selector = `[data-cy="${name}"]`;
    return subject ? cy.wrap(subject).find(selector) : cy.get(selector);
  },
);

export {};
