const searchField = () => cy.get('header input[type="search"]');

const themeButton = theme =>
  cy.get(`header button[aria-label="Switch to ${theme} theme"]`);

const expectNoHorizontalOverflow = () => {
  cy.window().should(win => {
    const width = Math.max(
      win.document.documentElement.scrollWidth,
      win.document.body.scrollWidth,
    );

    expect(width, 'page width').to.be.at.most(win.innerWidth);
  });
};

const expectLogos = (theme, width) => {
  const suffix = theme === 'dark' ? '-dark' : '';
  const headerVariant = width < 1200 ? 'mobile' : 'header';

  cy.get('header img[alt="NICE GADGETS"]').should($img => {
    expect($img[0].currentSrc).to.include(
      `/logo-${headerVariant}${suffix}.svg`,
    );
    expect($img[0].naturalWidth, 'loaded header logo').to.be.greaterThan(0);
  });
  cy.get('footer img')
    .filter(':visible')
    .should('have.length', 1)
    .and('have.attr', 'src')
    .and('include', `/logo-footer${suffix}.svg`);
};

describe('Search and appearance controls', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.readFile('public/api/products.json').then(products => {
      cy.intercept('GET', '**/api/products.json', { body: products }).as(
        'productsRequest',
      );
    });
  });

  it('exposes search on every searchable route without hover or an extra trigger', () => {
    cy.viewport(1440, 900);

    ['phones', 'tablets', 'accessories', 'favorites'].forEach(category => {
      cy.visit(`/#/${category}`);
      searchField()
        .should('be.visible')
        .and('have.attr', 'placeholder', `Search ${category}...`);
      themeButton('dark').should('be.visible');
      cy.get('button[aria-label="Open search and appearance"]').should(
        'not.exist',
      );
    });
  });

  it('keeps search available after leaving the header and clears the query with focus restored', () => {
    cy.viewport(1440, 900);
    cy.visit('/#/phones?sort=title&perPage=4&page=2');
    cy.wait('@productsRequest');
    searchField().should('be.visible').type('iPhone 14 Pro');
    cy.location('hash').should('include', 'query=iPhone+14+Pro');
    cy.get('header').trigger('mouseout', { relatedTarget: null });
    cy.get('#main-content h1').click();
    searchField().should('be.visible').and('have.value', 'iPhone 14 Pro');
    cy.get('button[aria-label="Clear search"]').click();
    searchField().should('have.value', '').and('be.focused');
    cy.location('hash').should(hash => {
      const params = new URLSearchParams(hash.split('?')[1] || '');

      expect(params.has('query')).to.equal(false);
      expect(params.has('page')).to.equal(false);
      expect(params.get('sort')).to.equal('title');
      expect(params.get('perPage')).to.equal('4');
    });
    cy.get('#main-content article').should('have.length', 4);
  });

  it('persists both themes after reload and swaps readable logo variants', () => {
    cy.viewport(1440, 900);
    cy.visit('/#/phones?perPage=4');
    cy.get('html').should('have.attr', 'data-theme', 'light');
    themeButton('dark')
      .should('be.visible')
      .and('have.attr', 'aria-pressed', 'false');
    expectLogos('light', 1440);

    themeButton('dark').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    themeButton('light').should('have.attr', 'aria-pressed', 'true');
    expectLogos('dark', 1440);
    cy.reload();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    themeButton('light')
      .should('be.visible')
      .and('have.attr', 'aria-pressed', 'true');
    expectLogos('dark', 1440);

    themeButton('light').click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
    themeButton('dark').should('have.attr', 'aria-pressed', 'false');
    expectLogos('light', 1440);
    cy.reload();
    cy.get('html').should('have.attr', 'data-theme', 'light');
    themeButton('dark').should('be.visible');
    expectLogos('light', 1440);
  });

  [320, 640, 1440].forEach(width => {
    it(`keeps search and theme controls usable without overflow at ${width}px`, () => {
      cy.viewport(width, 900);
      cy.visit('/#/phones?perPage=4');
      cy.wait('@productsRequest');
      searchField().should('be.visible').type('iPhone 14 Pro');
      cy.location('hash').should('include', 'query=iPhone+14+Pro');
      themeButton('dark').should('be.visible').click();
      searchField().should('be.visible').and('have.value', 'iPhone 14 Pro');
      themeButton('light').should('be.visible');
      expectLogos('dark', width);
      expectNoHorizontalOverflow();
      cy.get('button[aria-label="Clear search"]').click();
      searchField().should('be.focused').and('have.value', '');
      cy.location('hash').should('not.include', 'query=');
      expectNoHorizontalOverflow();
    });
  });

  it('keeps mobile navigation working alongside the visible controls', () => {
    cy.viewport(320, 812);
    cy.visit('/#/phones?perPage=4');
    searchField().should('be.visible');
    themeButton('dark').should('be.visible');
    cy.get('button[aria-label="Open menu"]').click();
    cy.get('nav[aria-label="Main navigation"]')
      .should('be.visible')
      .and($nav => {
        const win = $nav[0].ownerDocument.defaultView;

        expect(
          $nav[0].getBoundingClientRect().height,
          'menu height',
        ).to.be.closeTo(win.innerHeight - 104 - 64, 1);
      });
    cy.get('button[aria-label="Close menu"]').should(
      'have.attr',
      'aria-expanded',
      'true',
    );
    cy.get('nav[aria-label="Main navigation"] a[href="#/tablets"]').click();
    cy.location('hash').should('equal', '#/tablets');
    cy.get('#main-content h1').should('have.text', 'Tablets');
    cy.get('button[aria-label="Open menu"]').should(
      'have.attr',
      'aria-expanded',
      'false',
    );
    searchField()
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search tablets...');
    themeButton('dark').should('be.visible');
    expectNoHorizontalOverflow();
  });

  it('scrolls the mobile menu in a short landscape viewport so Accessories stays reachable', () => {
    cy.viewport(320, 320);
    cy.visit('/#/phones?perPage=4');
    cy.get('button[aria-label="Open menu"]').click();
    cy.get('nav[aria-label="Main navigation"]')
      .should('be.visible')
      .and($nav => {
        expect(
          $nav[0].getBoundingClientRect().height,
          'menu height',
        ).to.be.closeTo(152, 1);
        expect(
          $nav[0].scrollHeight,
          'scrollable menu content',
        ).to.be.greaterThan($nav[0].clientHeight);
      })
      .and('have.css', 'overflow-y', 'auto');
    cy.get(
      'nav[aria-label="Main navigation"] a[href="#/accessories"]',
    ).scrollIntoView();
    cy.get('nav[aria-label="Main navigation"]').should($nav => {
      expect(
        $nav[0].scrollTop,
        'menu scrolled to the last item',
      ).to.be.greaterThan(0);
    });
    cy.get('nav[aria-label="Main navigation"] a[href="#/accessories"]')
      .should('be.visible')
      .click();
    cy.location('hash').should('equal', '#/accessories');
    cy.get('#main-content h1').should('have.text', 'Accessories');
    cy.get('button[aria-label="Open menu"]').should(
      'have.attr',
      'aria-expanded',
      'false',
    );
    searchField()
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search accessories...');
    expectNoHorizontalOverflow();
  });
});
