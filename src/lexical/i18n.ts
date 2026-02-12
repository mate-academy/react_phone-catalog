// i18n.ts
/* eslint-disable import/no-extraneous-dependencies */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  uk: {
    translation: {
      // Navigation
      home: 'Головна',
      phones: 'Телефони',
      tablets: 'Планшети',
      accessories: 'Аксесуари',
      favorites: 'Улюблене',
      cart: 'Кошик',

      //Home page
      'Welcome to Nice Gadgets store!':
        'Ласкаво просимо до магазину Nice Gadgets!',
      'Brand new models': 'Нові моделі',
      'Hot prices': 'Гарячі знижки',
      'Shop by category': 'Наші категорії',

      banner: {
        title1: 'Вже доступно в нашому магазині!',
        description1: 'Будь першим',
        orderNow: 'Замовити зараз',
      },

      //Product Card
      addToCart: 'В кошик',
      addedToCart: 'Додано в кошик',

      //ProductSpecs
      screen: 'Розширення',
      resolution: 'Роздільна здатність',
      capacity: 'Ємкість',
      processor: 'Процесор',
      ram: 'RAM',
      camera: 'Камера',
      zoom: 'Зум',
      cell: "Зв'язок",

      //CategorriesPage
      phonesPage: 'Мобільні телефони',
      tabletsPage: 'Планшети',
      accessoriesPage: 'Аксесуари',

      modelsCount: '{{count}} моделей',
      sort: {
        new: 'Найновіші',
        old: 'Найстаріші',
        alphabetically: 'Алфавітному',
        expensive: 'Найдорожщі',
        cheapest: 'Найдешевші',
      },
      perPage: {
        '4': '4',
        '8': '8',
        '16': '16',
        all: 'Всі',
      },
      labels: {
        sortBy: 'Сортувати',
        itemsPerPage: 'Елементів за раз',
        search: 'Пошук',
      },

      //GoodPage
      about: 'Опис',
      tech: 'Технічні характеристки',
      availableColors: 'Доступні кольора',
      selectCapacity: 'Оберіть ємкість',
      'You may also like': 'Вам також може сподобатися',

      // Cart & Favorites
      favoritesPage: 'Улюблене',
      itemsCount: '{{count}} товарів',
      cartPage: 'Кошик',
      emptyCart: 'Кошик порожній',
      itemtsTotal: 'Загально для {{total}} товарів',
      checkout: 'Оформити',

      checkoutModal: {
        description: 'Оплата і введеня адресних даних поки що не доступне.',
        title: 'Ви бажаєте зімітувати покупку?',
      },

      // Plug & Loading
      noProducts: '{{category}} ще немає',
      noFavorites: 'Улюблених товарів немає',
      pageNotFound: {
        title: 'Сторінка не знайдена',
        description: 'Сторінка яку ви намагаєтесь відвідати не існує.',
      },
      tryAgain: 'Спробувати ще раз',
      productNotFound: 'Продукт не знайдено',

      // Footer
      contacts: 'КОНТАКТИ',
      rights: 'ПОЛІТИКА',

      //Select ||  Input || other
      defaultPlaceholder: 'Оберіть опцію',
      back: 'Назад',
      backToTop: 'До гори',

      errors: {
        NETWORK_ERROR: 'Помилка мережі. Спробуйте пізніше.',
        NOT_FOUND: 'Товари не знайдено.',
        UNKNOWN_ERROR: 'Щось пішло не так.',
      },
    },
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      phones: 'Phones',
      tablets: 'Tablets',
      accessories: 'Accessories',
      favorites: 'Favorites',
      cart: 'Cart',

      //Home page
      'Welcome to Nice Gadgets store!': 'Welcome to Nice Gadgets store!',
      'Brand new models': 'Brand new models',
      'Hot prices': 'Hot prices',
      'Shop by category': 'Shop by category',

      banner: {
        title1: 'Now available \n in our store!',
        description1: 'Be the first',
        orderNow: 'Order now',
      },

      //Product Card

      addToCart: 'Add to cart',
      addedToCart: 'Added to cart',

      //ProductSpecs
      screen: 'Screen',
      capacity: 'Capacity',
      processor: 'Processor',
      resolution: 'Resolution',
      ram: 'RAM',
      camera: 'Camera',
      zoom: 'Zoom',
      cell: 'Cell',

      //CategorriesPage
      phonesPage: 'Mobile phones',
      tabletsPage: 'Tablets',
      accessoriesPage: 'Accessories',

      modelsCount: '{{count}} models',

      sort: {
        new: 'Newest',
        old: 'Oldest',
        alphabetically: 'Alphabetically',
        expensive: 'Expensive',
        cheapest: 'Cheapest',
      },
      perPage: {
        '4': '4',
        '8': '8',
        '16': '16',
        all: 'All',
      },
      labels: {
        sortBy: 'Sort by',
        itemsPerPage: 'Items per page',
        search: 'Search',
      },

      //GoodPage
      about: 'About',
      tech: 'Tech specs',
      availableColors: 'Available colors',
      selectCapacity: 'Select capacity',
      'You may also like': 'You may also like',

      // Cart & Favorites
      favoritesPage: 'Favorites',
      itemsCount: '{{count}} items',
      cartPage: 'Cart',
      emptyCart: 'Cart is empty',
      itemtsTotal: 'Total for {{total}} items',
      checkout: 'Checkout',

      checkoutModal: {
        description: 'Payment and address entry are not yet available.',
        title: 'Do you want to simulate a purchase?',
      },

      // Plugg & Loading
      noProducts: 'There are no {{category}} yet',
      noFavorites: 'No favorite products',
      pageNotFound: {
        title: 'Page not found',
        description: 'The page you are looking for doesn’t exist',
      },
      tryAgain: 'Try again',
      productNotFound: 'Product not found',

      // Footer
      contacts: 'CONTACTS',
      rights: 'RIGHTS',

      //Select ||  Input || other
      defaultPlaceholder: 'Select Option',
      back: 'Back',
      backToTop: 'Back to top',

      errors: {
        NETWORK_ERROR: 'Network error. Please try again later.',
        NOT_FOUND: 'Products not found.',
        UNKNOWN_ERROR: 'Something went wrong.',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    supportedLngs: ['en', 'uk'],
    nonExplicitSupportedLngs: true,
  });

export default i18n;
