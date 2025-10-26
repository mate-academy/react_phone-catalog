import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        phones: 'Phones',
        tablets: 'Tablets',
        accessories: 'Accessories',
      },
      // Header
      header: {
        cart: 'Shopping cart',
        favorites: 'Favorites',
        menu: 'Open menu',
        closeMenu: 'Close menu',
      },
      // Common
      common: {
        back: 'Back',
        loading: 'Loading...',
        search: 'Search',
        searchPlaceholder: 'Search...',
        noResults: 'No results found',
      },
      // Home page
      home: {
        hotPrices: 'Hot prices',
        brandNew: 'Brand new models',
        shopByCategory: 'Shop by category',
      },
      // Category page
      category: {
        models: 'models',
        sortBy: 'Sort by',
        itemsOnPage: 'Items on page',
        newest: 'Newest',
        cheapest: 'Cheapest',
        alphabetically: 'Alphabetically',
        searchIn: 'Search in {{category}}...',
        noProductsMatching: 'There are no {{category}} matching the query',
      },
      // Favorites page
      favorites: {
        title: 'Favourites',
        empty: 'Your favourites list is empty',
        emptySubtext: 'Add products you like to see them here',
        items: '{{count}} items',
        item: '{{count}} item',
        searchPlaceholder: 'Search in favourites...',
        noMatching: 'There are no products matching the query',
      },
      // Cart page
      cart: {
        title: 'Cart',
        empty: 'Your cart is empty',
        totalFor: 'Total for {{count}} items',
        checkout: 'Checkout',
      },
      // Product details
      product: {
        availableColors: 'Available colors',
        selectCapacity: 'Select capacity',
        addToCart: 'Add to Cart',
        removeFromCart: 'Remove from Cart',
        about: 'About',
        techSpecs: 'Tech specs',
        youMayLike: 'You may also like',
        notFound: 'Product not found',
        inCart: 'In the cart',
      },
      // Product card
      productCard: {
        screen: 'Screen',
        capacity: 'Capacity',
        ram: 'RAM',
      },
      // Not Found page
      notFound: {
        pageTitle: 'Page not found',
        pageDescription:
          "The page you are looking for doesn't exist or has been moved.",
        backToHome: 'Back to Home',
      },
    },
  },
  uk: {
    translation: {
      // Navigation
      nav: {
        home: 'Головна',
        phones: 'Телефони',
        tablets: 'Планшети',
        accessories: 'Аксесуари',
      },
      // Header
      header: {
        cart: 'Кошик',
        favorites: 'Обране',
        menu: 'Відкрити меню',
        closeMenu: 'Закрити меню',
      },
      // Common
      common: {
        back: 'Назад',
        loading: 'Завантаження...',
        search: 'Пошук',
        searchPlaceholder: 'Пошук...',
        noResults: 'Результатів не знайдено',
      },
      // Home page
      home: {
        hotPrices: 'Гарячі ціни',
        brandNew: 'Нові моделі',
        shopByCategory: 'Покупки за категоріями',
      },
      // Category page
      category: {
        models: 'моделей',
        sortBy: 'Сортувати за',
        itemsOnPage: 'Товарів на сторінці',
        newest: 'Найновіші',
        cheapest: 'Найдешевші',
        alphabetically: 'За алфавітом',
        searchIn: 'Пошук в {{category}}...',
        noProductsMatching: 'Немає {{category}}, що відповідають запиту',
      },
      // Favorites page
      favorites: {
        title: 'Обране',
        empty: 'Ваш список обраного порожній',
        emptySubtext:
          'Додайте товари, які вам подобаються, щоб побачити їх тут',
        items: '{{count}} товарів',
        item: '{{count}} товар',
        searchPlaceholder: 'Пошук в обраному...',
        noMatching: 'Немає товарів, що відповідають запиту',
      },
      // Cart page
      cart: {
        title: 'Кошик',
        empty: 'Ваш кошик порожній',
        totalFor: 'Всього за {{count}} товарів',
        checkout: 'Оформити замовлення',
      },
      // Product details
      product: {
        availableColors: 'Доступні кольори',
        selectCapacity: 'Оберіть обсяг',
        addToCart: 'Додати в кошик',
        removeFromCart: 'Видалити з кошика',
        about: 'Про товар',
        techSpecs: 'Технічні характеристики',
        youMayLike: 'Вам також може сподобатись',
        notFound: 'Товар не знайдено',
        inCart: 'В кошику',
      },
      // Product card
      productCard: {
        screen: 'Екран',
        capacity: 'Обсяг',
        ram: "Оперативна пам'ять",
      },
      // Not Found page
      notFound: {
        pageTitle: 'Сторінку не знайдено',
        pageDescription:
          'Сторінка, яку ви шукаєте, не існує або була переміщена.',
        backToHome: 'Повернутися на головну',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
