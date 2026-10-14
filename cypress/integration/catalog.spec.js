const confirmMessage =
  'Checkout is not implemented yet. Do you want to clear the Cart?';

const getHashParams = hash => new URLSearchParams(hash.split('?')[1] || '');

const pageTitle = category =>
  category === 'phones'
    ? 'Mobile phones'
    : category === 'favorites'
      ? 'Favourites'
      : category.slice(0, 1).toUpperCase() + category.slice(1);

const searchField = () => cy.get('input[type="search"]').should('be.visible');

const expectVisibleProducts = products => {
  cy.get('#main-content article').should($cards => {
    const names = $cards
      .map((_, card) =>
        Cypress.$(card)
          .find('a')
          .filter((index, link) => Boolean(link.textContent.trim()))
          .text(),
      )
      .get();

    expect(names).to.deep.equal(products.map(product => product.name));
  });
};

const visitWithProducts = (route, expectedTitle) => {
  cy.get('@products').then(products => {
    const path = route.split('#')[1].split('?')[0];
    const product = path.startsWith('/product/')
      ? products.find(item => item.itemId === path.slice('/product/'.length))
      : null;
    const title = path.startsWith('/product/')
      ? product?.name || 'Product was not found'
      : path === '/'
        ? 'Product Catalog'
        : pageTitle(path.slice(1));

    cy.visit(route);
    cy.get('#main-content h1').should('have.text', expectedTitle || title);
    cy.get('[role="status"]').should('not.exist');
  });
};

const expectNoHorizontalOverflow = () => {
  cy.window().should(win => {
    const width = Math.max(
      win.document.documentElement.scrollWidth,
      win.document.body.scrollWidth,
    );

    expect(width, 'page width').to.be.at.most(win.innerWidth);
  });
};

describe('Product catalog', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.readFile('public/api/products.json').then(products => {
      cy.wrap(products).as('products');
      cy.intercept('GET', '**/api/products.json', { body: products }).as(
        'productsRequest',
      );
    });
  });

  it('sorts and paginates the actual data and restores URL settings', () => {
    cy.get('@products').then(products => {
      const phones = products.filter(product => product.category === 'phones');
      const cheapest = [...phones].sort((a, b) => a.price - b.price);
      const alphabetical = [...phones].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      const newest = [...phones].sort((a, b) => b.year - a.year || b.id - a.id);

      visitWithProducts('/#/phones?sort=price&perPage=4&page=2');
      cy.get('#catalog-sort').should('have.value', 'price');
      cy.get('#catalog-per-page').should('have.value', '4');
      expectVisibleProducts(cheapest.slice(4, 8));

      cy.get('#catalog-sort').select('title');
      cy.location('hash').should(hash => {
        const params = getHashParams(hash);

        expect(params.get('sort')).to.equal('title');
        expect(params.get('perPage')).to.equal('4');
        expect(params.has('page')).to.equal(false);
      });
      expectVisibleProducts(alphabetical.slice(0, 4));

      cy.get('#catalog-per-page').select('8');
      expectVisibleProducts(alphabetical.slice(0, 8));
      cy.get(
        'nav[aria-label="Product pages"] button[aria-label="Next page"]',
      ).click();
      expectVisibleProducts(alphabetical.slice(8, 16));
      cy.reload();
      cy.get('#catalog-sort').should('have.value', 'title');
      cy.get('#catalog-per-page').should('have.value', '8');
      cy.get('button[aria-current="page"]').should('have.text', '2');
      expectVisibleProducts(alphabetical.slice(8, 16));

      cy.get('#catalog-per-page').select('all');
      cy.location('hash').should(hash => {
        const params = getHashParams(hash);

        expect(params.has('perPage')).to.equal(false);
        expect(params.has('page')).to.equal(false);
      });
      cy.get('nav[aria-label="Product pages"]').should('not.exist');
      expectVisibleProducts(alphabetical);

      cy.get('#catalog-sort').select('age');
      cy.location('hash').should('include', 'sort=age');
      expectVisibleProducts(newest);
    });
  });

  it('clamps page numbers and preserves a debounced search on reload', () => {
    cy.get('@products').then(products => {
      const phones = products.filter(product => product.category === 'phones');
      const query = 'iPhone 14 Pro';
      const matching = phones
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      visitWithProducts('/#/phones?sort=title&perPage=4&page=999');
      cy.location('hash').should(hash => {
        expect(getHashParams(hash).get('page')).to.equal(
          String(Math.ceil(phones.length / 4)),
        );
      });
      searchField().type(query);
      cy.location('hash').should(hash => {
        const params = getHashParams(hash);

        expect(params.get('query')).to.equal(query);
        expect(params.get('sort')).to.equal('title');
        expect(params.get('perPage')).to.equal('4');
        expect(params.has('page')).to.equal(false);
      });
      expectVisibleProducts(matching.slice(0, 4));
      cy.reload();
      searchField().should('have.value', query);
      expectVisibleProducts(matching.slice(0, 4));

      searchField().clear().type('no-such-phone-xyz');
      cy.contains('There are no phones matching the query').should(
        'be.visible',
      );
      cy.get('#main-content article').should('not.exist');
      cy.get('nav[aria-label="Product pages"]').should('not.exist');
      searchField().clear();
      cy.location('hash').should(hash => {
        expect(getHashParams(hash).has('query')).to.equal(false);
      });
      cy.get('#main-content article').should('have.length', 4);
    });
  });

  it('normalizes invalid values and omits default pagination values', () => {
    visitWithProducts(
      '/#/tablets?sort=unknown&perPage=wrong&page=-2&query=ipad',
    );
    cy.contains('h1', 'Tablets').should('be.visible');
    cy.get('#catalog-sort').should('have.value', 'age');
    cy.get('#catalog-per-page').should('have.value', 'all');
    cy.location('hash').should(hash => {
      const params = getHashParams(hash);

      expect(params.get('query')).to.equal('ipad');
      expect(params.has('sort')).to.equal(false);
      expect(params.has('perPage')).to.equal(false);
      expect(params.has('page')).to.equal(false);
    });
    cy.get('nav[aria-label="Product pages"]').should('not.exist');

    visitWithProducts('/#/phones?sort=age&perPage=all&page=1');
    cy.location('hash').should(hash => {
      const params = getHashParams(hash);

      expect(params.get('sort')).to.equal('age');
      expect(params.has('perPage')).to.equal(false);
      expect(params.has('page')).to.equal(false);
    });
  });

  it('loads the correct data for all three categories', () => {
    cy.get('@products').then(products => {
      ['phones', 'tablets', 'accessories'].forEach(category => {
        const expected = products
          .filter(product => product.category === category)
          .sort((a, b) => b.year - a.year || b.id - a.id);
        const title = pageTitle(category);

        visitWithProducts(`/#/${category}`);
        cy.get('#main-content h1').should('have.text', title);
        expectVisibleProducts(expected);
      });
    });
  });

  it('keeps cart items unique, enforces quantity limits and confirms checkout', () => {
    cy.get('@products').then(products => {
      const [first, second] = products
        .filter(product => product.category === 'phones')
        .sort((a, b) => a.price - b.price);

      visitWithProducts('/#/phones?sort=price&perPage=4');
      cy.contains('#main-content article', first.name).within(() => {
        cy.contains('button', /^Add to cart$/).click();
        cy.contains('button', /^Added to cart$/)
          .should('have.attr', 'aria-disabled', 'true')
          .click();
      });
      cy.contains('#main-content article', second.name).within(() => {
        cy.contains('button', /^Add to cart$/).click();
      });

      cy.visit('/#/cart');
      cy.get('#main-content article').should('have.length', 2);
      cy.get('aside[aria-label="Order summary"] p')
        .first()
        .should('have.text', `$${first.price + second.price}`);
      cy.get(`button[aria-label="Remove ${second.name} from cart"]`).click();
      cy.get('#main-content article').should('have.length', 1);
      cy.get('button[aria-label^="Decrease quantity"]').should('be.disabled');
      cy.get('#main-content article span[aria-live="polite"]').should(
        'have.text',
        '1',
      );
      cy.get('button[aria-label^="Increase quantity"]').click();
      cy.get('#main-content article span[aria-live="polite"]').should(
        'have.text',
        '2',
      );
      cy.get('button[aria-label^="Decrease quantity"]').click();
      cy.get('button[aria-label^="Decrease quantity"]').should('be.disabled');
      cy.get('button[aria-label^="Increase quantity"]').click();
      cy.reload();
      cy.get('#main-content article').should('have.length', 1);
      cy.get('#main-content article span[aria-live="polite"]').should(
        'have.text',
        '2',
      );
      cy.get('aside[aria-label="Order summary"] p')
        .first()
        .should('have.text', `$${first.price * 2}`);
      cy.contains('Total for 2 items').should('be.visible');

      cy.window().then(win => {
        cy.stub(win, 'confirm').returns(false).as('checkoutConfirm');
      });
      cy.contains('button', /^Checkout$/).click();
      cy.get('@checkoutConfirm').should(
        'have.been.calledOnceWithExactly',
        confirmMessage,
      );
      cy.get('#main-content article').should('have.length', 1);
      cy.get('@checkoutConfirm').then(confirm => confirm.returns(true));
      cy.contains('button', /^Checkout$/).click();
      cy.contains('Your cart is empty').should('be.visible');
      cy.reload();
      cy.contains('Your cart is empty').should('be.visible');
      cy.get('#main-content article').should('not.exist');
    });
  });

  it('migrates saved cart and favorites to canonical product identifiers', () => {
    cy.get('@products').then(products => {
      const legacyProduct = products.find(
        product => product.itemId === 'apple-iphone-11-128gb-black',
      );

      cy.visit('/#/cart', {
        onBeforeLoad(win) {
          win.localStorage.setItem(
            'nice-gadgets-cart',
            JSON.stringify([
              { id: legacyProduct.itemId, quantity: 2, product: legacyProduct },
            ]),
          );
          win.localStorage.setItem(
            'nice-gadgets-favorites',
            JSON.stringify([legacyProduct]),
          );
        },
      });

      cy.get('#main-content h1').should('have.text', 'Cart');
      cy.get('#main-content article').should(
        'contain.text',
        legacyProduct.name,
      );
      cy.get('#main-content article span[aria-live="polite"]').should(
        'have.text',
        '2',
      );
      cy.window().should(win => {
        const cart = JSON.parse(win.localStorage.getItem('nice-gadgets-cart'));
        const favorites = JSON.parse(
          win.localStorage.getItem('nice-gadgets-favorites'),
        );

        expect(cart).to.have.length(1);
        expect(cart[0].id).to.equal(legacyProduct.itemId);
        expect(cart[0].product.itemId).to.equal(legacyProduct.itemId);
        expect(cart[0].product.sortOrder).to.equal(legacyProduct.id);
        expect(cart[0].product).not.to.have.property('id');
        expect(favorites).to.have.length(1);
        expect(favorites[0].itemId).to.equal(legacyProduct.itemId);
        expect(favorites[0].sortOrder).to.equal(legacyProduct.id);
        expect(favorites[0]).not.to.have.property('id');
      });

      cy.reload();
      cy.get('#main-content article').should(
        'contain.text',
        legacyProduct.name,
      );
      cy.get('#main-content article span[aria-live="polite"]').should(
        'have.text',
        '2',
      );
      cy.visit('/#/favorites');
      expectVisibleProducts([legacyProduct]);
      cy.reload();
      expectVisibleProducts([legacyProduct]);
    });
  });

  it('persists favorites, filters them and removes them with the heart', () => {
    cy.get('@products').then(products => {
      const first = products
        .filter(product => product.category === 'phones')
        .sort((a, b) => a.price - b.price)[0];

      visitWithProducts('/#/phones?sort=price&perPage=4');
      cy.get(`button[aria-label="Add ${first.name} to favorites"]`).click();
      cy.get(`button[aria-label="Remove ${first.name} from favorites"]`).should(
        'have.attr',
        'aria-pressed',
        'true',
      );
      cy.visit('/#/favorites');
      expectVisibleProducts([first]);
      cy.reload();
      expectVisibleProducts([first]);

      searchField().type('no-such-favorite-xyz');
      cy.contains('There are no products matching the query').should(
        'be.visible',
      );
      searchField().clear();
      expectVisibleProducts([first]);
      cy.get(
        `button[aria-label="Remove ${first.name} from favorites"]`,
      ).click();
      cy.contains('Your favorites are empty').should('be.visible');
      cy.reload();
      cy.contains('Your favorites are empty').should('be.visible');
    });
  });

  it('changes product variants, gallery pictures and returns with Back', () => {
    cy.readFile('public/api/phones.json').then(details => {
      const first = details.find(
        item => item.id === 'apple-iphone-11-128gb-black',
      );
      const nextColor = details.find(
        item =>
          item.namespaceId === first.namespaceId &&
          item.capacity === first.capacity &&
          item.color !== first.color,
      );
      const nextCapacity = details.find(
        item =>
          item.namespaceId === nextColor.namespaceId &&
          item.color === nextColor.color &&
          item.capacity !== nextColor.capacity,
      );

      cy.intercept('GET', '**/api/phones.json', { body: details }).as(
        'phoneDetails',
      );
      visitWithProducts(`/#/product/${first.id}`);
      cy.wait('@phoneDetails');
      cy.get('#main-content h1').should('have.text', first.name);
      cy.get(`input[name="product-color"][value="${first.color}"]`).should(
        'be.checked',
      );
      cy.get(`input[name="product-color"][value="${nextColor.color}"]`).check({
        force: true,
      });
      cy.location('hash').should('equal', `#/product/${nextColor.id}`);
      cy.get('#main-content h1').should('have.text', nextColor.name);
      cy.get(`input[name="product-color"][value="${nextColor.color}"]`).should(
        'be.checked',
      );
      cy.get(
        `input[name="product-capacity"][value="${nextCapacity.capacity}"]`,
      ).check({ force: true });
      cy.location('hash').should('equal', `#/product/${nextCapacity.id}`);
      cy.get('#main-content h1').should('have.text', nextCapacity.name);
      cy.get(
        `button[aria-label="View picture 2 of ${nextCapacity.name}"]`,
      ).click();
      cy.get(`img[alt="${nextCapacity.name}, view 2"]`)
        .should('have.attr', 'src')
        .and('include', nextCapacity.images[1]);
      cy.contains('button', /^Back$/).click();
      cy.location('hash').should('equal', `#/product/${nextColor.id}`);
      cy.get('#main-content h1').should('have.text', nextColor.name);
    });
  });

  it('shows distinct missing-product and unknown-page states', () => {
    visitWithProducts('/#/product/no-such-product-xyz');
    cy.contains('h1', 'Product was not found').should('be.visible');
    cy.contains('a', 'Go to home page').should('have.attr', 'href', '#/');
    cy.visit('/#/no-such-page-xyz');
    cy.contains('h1', 'Page not found').should('be.visible');
    cy.get('#main-content a[href="#/"]').should('be.visible');
  });

  it('uses canonical Gold 512GB URLs and catalog prices for variants and cart', () => {
    cy.get('@products').then(products => {
      const gold512 = products.find(
        item => item.itemId === 'apple-iphone-14-pro-512gb-gold',
      );
      const gold256 = products.find(
        item => item.itemId === 'apple-iphone-14-pro-256gb-gold',
      );

      cy.readFile('public/api/phones.json').then(details => {
        cy.intercept('GET', '**/api/phones.json', { body: details }).as(
          'goldDetails',
        );
      });
      visitWithProducts(`/#/phones?query=${encodeURIComponent(gold512.name)}`);
      cy.contains('#main-content article', gold512.name).within(() => {
        cy.contains('span', `$${gold512.price}`).should(
          'have.text',
          `$${gold512.price}`,
        );
        cy.get('s').should('have.text', `$${gold512.fullPrice}`);
        cy.contains('a', gold512.name).click();
      });
      cy.wait('@goldDetails');
      cy.location('hash').should('equal', `#/product/${gold512.itemId}`);
      cy.get('#main-content h1').should('have.text', gold512.name);
      cy.contains('#main-content strong', `$${gold512.price}`).should(
        'have.text',
        `$${gold512.price}`,
      );
      cy.get('#main-content del').should('have.text', `$${gold512.fullPrice}`);
      cy.get('input[name="product-capacity"][value="256GB"]').check({
        force: true,
      });
      cy.location('hash').should('equal', `#/product/${gold256.itemId}`);
      cy.get('#main-content h1').should('have.text', gold256.name);
      cy.contains('#main-content strong', `$${gold256.price}`).should(
        'have.text',
        `$${gold256.price}`,
      );
      cy.get('#main-content del').should('have.text', `$${gold256.fullPrice}`);
      cy.get('input[name="product-capacity"][value="512GB"]').check({
        force: true,
      });
      cy.location('hash').should('equal', `#/product/${gold512.itemId}`);
      cy.get('#main-content h1').should('have.text', gold512.name);
      cy.contains('#main-content button', /^Add to cart$/).click();
      cy.visit('/#/cart');
      cy.get('aside[aria-label="Order summary"] p')
        .first()
        .should('have.text', `$${gold512.price}`);
      cy.contains('#main-content article', gold512.name).should('be.visible');
    });
  });

  it('advances collections every five seconds, wraps and supports direct selection', () => {
    cy.clock(0, ['setInterval', 'clearInterval']);
    visitWithProducts('/#/');
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '1 of 3: Phones',
    );
    cy.tick(4999);
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '1 of 3: Phones',
    );
    cy.tick(1);
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '2 of 3: Tablets',
    );
    cy.tick(5000);
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '3 of 3: Accessories',
    );
    cy.tick(5000);
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '1 of 3: Phones',
    );
    cy.get('button[aria-label="Previous collection"]').click();
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '3 of 3: Accessories',
    );
    cy.get('button[aria-label="Next collection"]').click();
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '1 of 3: Phones',
    );
    cy.get('button[aria-label="Show slide 2: Tablets"]')
      .click()
      .should('have.attr', 'aria-pressed', 'true');
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '2 of 3: Tablets',
    );
    cy.get('button[aria-label="Pause slideshow"]').click().blur();
    cy.get('[aria-roledescription="carousel"]').trigger('mouseout', {
      relatedTarget: null,
    });
    cy.tick(10000);
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '2 of 3: Tablets',
    );
    cy.get('button[aria-label="Resume slideshow"]').click().blur();
    cy.get('[aria-roledescription="carousel"]').trigger('mouseout', {
      relatedTarget: null,
    });
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-live',
      'off',
    );
    cy.tick(5000);
    cy.get('[aria-roledescription="slide"]').should(
      'have.attr',
      'aria-label',
      '3 of 3: Accessories',
    );
  });

  it('scrolls product rails with the controls and disables controls at the ends', () => {
    cy.viewport(1000, 900);
    visitWithProducts('/#/');
    cy.get('[role="region"][aria-label="Hot prices products"]').as('hotRail');
    cy.get('@hotRail').find('article').should('have.length', 12);
    cy.get('button[aria-label="Previous hot prices products"]').should(
      'be.disabled',
    );
    cy.get('button[aria-label="Next hot prices products"]')
      .should('not.be.disabled')
      .click();
    cy.get('@hotRail').should($rail => {
      expect($rail[0].scrollLeft).to.be.greaterThan(0);
    });
    cy.get('button[aria-label="Previous hot prices products"]')
      .should('not.be.disabled')
      .click();
    cy.get('@hotRail').should($rail => {
      expect($rail[0].scrollLeft).to.be.lessThan(2);
    });
    cy.get('@hotRail').scrollTo('right');
    cy.get('button[aria-label="Next hot prices products"]').should(
      'be.disabled',
    );
    cy.get('button[aria-label="Previous hot prices products"]').should(
      'not.be.disabled',
    );
  });

  it('shows a loader and recovers from a failed catalog request', () => {
    cy.get('@products').then(products => {
      let requests = 0;

      cy.intercept('GET', '**/api/products.json', req => {
        requests += 1;
        req.reply(
          requests === 1
            ? { statusCode: 500, body: {}, delay: 500 }
            : { body: products },
        );
      }).as('retryProducts');
      cy.visit('/#/phones?perPage=4');
      cy.get('[role="status"]').should('contain.text', 'Loading products');
      cy.wait('@retryProducts');
      cy.get('[role="alert"]').should('contain.text', 'Something went wrong');
      cy.contains('button', /^Reload$/).click();
      cy.wait('@retryProducts');
      cy.get('[role="alert"]').should('not.exist');
      cy.get('#main-content article').should('have.length', 4);
    });
  });

  it('recovers from a failed product-details request', () => {
    cy.readFile('public/api/phones.json').then(details => {
      let requests = 0;
      const first = details.find(
        item => item.id === 'apple-iphone-11-128gb-black',
      );

      cy.intercept('GET', '**/api/phones.json', req => {
        requests += 1;
        req.reply(
          requests === 1 ? { statusCode: 500, body: {} } : { body: details },
        );
      }).as('retryDetails');
      visitWithProducts(`/#/product/${first.id}`, 'Something went wrong');
      cy.wait('@retryDetails');
      cy.get('[role="alert"]').should('contain.text', 'Something went wrong');
      cy.contains('button', /^Reload$/).click();
      cy.wait('@retryDetails');
      cy.get('#main-content h1').should('have.text', first.name);
      cy.get('[role="alert"]').should('not.exist');
    });
  });

  it('shows the empty category state for an empty server response', () => {
    cy.intercept('GET', '**/api/products.json', { body: [] }).as(
      'emptyProducts',
    );
    cy.visit('/#/phones');
    cy.wait('@emptyProducts');
    cy.contains('There are no phones yet').should('be.visible');
    cy.get('#main-content article').should('not.exist');
    cy.get('#catalog-sort').should('not.exist');
    cy.get('nav[aria-label="Product pages"]').should('not.exist');
  });

  it('fits catalog, favorites, cart and product details in a 375px viewport', () => {
    cy.viewport(375, 812);
    cy.get('@products').then(products => {
      const first = products
        .filter(product => product.category === 'phones')
        .sort((a, b) => a.price - b.price)[0];

      visitWithProducts('/#/phones?sort=price&perPage=4');
      cy.get('#main-content article').should('have.length', 4);
      expectNoHorizontalOverflow();
      cy.contains('#main-content article', first.name).within(() => {
        cy.contains('button', /^Add to cart$/).click();
        cy.get(`button[aria-label="Add ${first.name} to favorites"]`).click();
      });
      cy.visit('/#/cart');
      cy.get('#main-content article').should('have.length', 1);
      expectNoHorizontalOverflow();
      cy.visit('/#/favorites');
      cy.get('#main-content article').should('have.length', 1);
      expectNoHorizontalOverflow();

      ['tablets', 'accessories'].forEach(category => {
        visitWithProducts(`/#/${category}?perPage=4`);
        cy.get('#main-content article').should('have.length', 4);
        expectNoHorizontalOverflow();
      });
    });

    cy.readFile('public/api/phones.json').then(details => {
      const first = details.find(
        item => item.id === 'apple-iphone-11-128gb-black',
      );

      cy.intercept('GET', '**/api/phones.json', { body: details }).as(
        'mobileDetails',
      );
      visitWithProducts(`/#/product/${first.id}`);
      cy.wait('@mobileDetails');
      cy.get('#main-content h1').should('have.text', first.name);
      expectNoHorizontalOverflow();
    });
  });
});
