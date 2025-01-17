const en = {
  welcomeMessage: 'Welcome to React and react-i18next',
  header: {
    navigation: {
      home: 'HOME',
      phones: 'PHONES',
      tablets: 'TABLETS',
      accessories: 'ACCESSORIES',
    },
    languageSwitcher: 'UK',
    themeSwitcher: {
      light: 'dark',
      dark: 'light',
    },
  },

  search: {
    placeholder: 'Search in {{category}}',
    categories: {
      phones: 'phones',
      tablets: 'tablets',
      accessories: 'accessories',
    },
  },

  footer: {
    contacts: 'CONTACTS',
    rights: 'RIGHTS',
    backToTop: 'Back to top',
    notificationAlert:
      // eslint-disable-next-line max-len
      'You are about to leave this page and visit the GitHub profile of the project creator. Do you wish to continue?',
    rightsAlert: 'This is a mock implementation. Full feature coming soon!',
  },

  homePage: {
    title: 'Welcome to Nice Gadgets store!',
    brandNewModels: 'Brand new models',
    hotPrices: 'Hot prices',
    categories: {
      mainTitle: 'Shop by category',
      phonesTitle: 'Mobile phones',
      tabletsTitle: 'Tablets',
      accessoriesTitle: 'Accessories',
      count_one: '{{count}} model',
      count_few: '{{count}} models',
      count_many: '{{count}} models',
      count_other: '{{count}} models',
      shopLatest: 'Shop the latest {{category}}',
      performanceAndStyle: 'Performance and style in your hands!',
    },
  },

  breadCrumbs: {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favorites: 'Favorites',
  },

  sortByDropdown: {
    title: 'Sort by',
    option: {
      newest: 'Newest',
      alphabetically: 'Alphabetically',
      cheapest: 'Cheapest',
    },
    placeholder: 'Select an option',
  },

  itemsPerPageDropdown: {
    title: 'Items on page',
    all: 'All',
  },

  phonesPage: {
    title: 'Mobile phones',
    count_one: '{{count}} model',
    count_other: '{{count}} models',
  },

  tabletsPage: {
    title: 'Tablets',
    count_one: '{{count}} model',
    count_other: '{{count}} models',
  },

  accessoriesPage: {
    title: 'Accessories',
    count_one: '{{count}} model',
    count_other: '{{count}} models',
  },

  favoritesPage: {
    title: 'Favorites',
    count_one: '{{count}} model',
    count_other: '{{count}} models',
    empty:
      'You don’t have any favorites yet. \nExplore and add your top picks!',
  },

  productDetailsPage: {
    suggestionsTitle: 'You may also like',
    screen: 'Screen',
    processor: 'Processor',
    resolution: 'Resolution',
    capacity: 'Capacity',
    ram: 'RAM',
    about: 'About',
    techSpecs: 'Tech specs',
    builtInMemory: 'Built in memory',
    camera: 'Camera',
    zoom: 'Zoom',
    cell: 'Cell',
  },

  colorSelection: {
    title: 'Available colors',
  },

  capacitySelection: {
    title: 'Select capacity',
  },

  cartPage: {
    title: 'Cart',
    totalFor: 'Total for {{count}} {{items}}',
    items: {
      one: 'item',
      few: 'items',
      many: 'items',
      other: 'items',
    },
    emptyCart: 'Your cart is empty',
    checkout: 'Checkout',
  },

  modal: {
    title: 'Checkout is not implemented yet.',
    message: 'Do you want to clear the cart?',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
  },

  notFoundPage: {
    message: 'Oops!',
    title: 'Page Not Found',
    backHome: 'Go back to Home',
  },

  productNotFoundPage: {
    phones: 'No phones found. Please try again!',
    tablets: 'No tablets found. Please try again!',
    accessories: 'No accessories found. Please try again!',
    titleOutOfStock: 'Back Soon: Product Out of Stock',
  },

  buttonBack: {
    back: 'Back',
  },

  productCard: {
    specs: {
      screen: 'Screen',
      capacity: 'Capacity',
      ram: 'RAM',
    },

    button: {
      add: 'Add to cart',
      added: 'Added to cart',
    },

    toast: {
      added: '{{name}} has been added to the cart!',
      removed: '{{name}} has been removed from the cart!',
    },
  },
};

export default en;
