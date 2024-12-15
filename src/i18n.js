import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Тексти перекладів
const resources = {
  en: {
    translation: {
      headHome: 'HOME',

      //home
      h1: 'Welcome to Nice Gadgets Store!',
      h2Brands: 'Brand new models',
      h2Category: 'Shop by category',
      home: 'Home',
      phones: 'Phones',
      mobiles: 'Mobile phones',
      tablets: 'Tablets',
      accessors: 'Accessories',
      models: 'models',
      h2Hot: 'Hot prices',

      //characters
      screen: 'Screen',
      capac: 'Capacity',
      ram: 'RAM',
      resolution: 'Resolution',
      proccessor: 'Proccessor',
      memory: 'Built in memory',
      zoom: 'Zoom',
      camera: 'Camera',
      cell: 'Cell',

      addCart: 'Add to cart',
      addedCart: 'Added',

      //categories
      sortBy: 'Sort by',
      newest: 'Newest',
      alph: 'Alphabetically',
      cheap: 'Cheapest',
      itemsPer: 'Items per page',
      favourites: 'Favourites',

      //cart
      cart: 'Cart',
      total: 'Total for ',
      items: ' items',
      checkout: 'Checkout',

      //item
      back: 'Back',
      availCols: 'Available colors',
      selCapac: 'Select capacity',
      h2About: 'About',
      h2Tech: 'Tech specs',
      h2AlsoLike: 'You may also like',

      //footer
      contacts: 'contacts',
      rights: 'rights',
      backTop: 'Back to top',
      theme: 'Theme:',
      lang: 'Languages:',

      //modal
      modText:
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      yes: 'Yes',
      no: 'No',
    },
  },
  uk: {
    translation: {
      //home
      h1: 'Ласкаво просимо до Nice Gadgets Store!',
      h2Brands: 'Нові моделі',
      h2Category: 'Купляйте по категоріям',
      home: 'Головна',
      phones: 'Телефони',
      mobiles: 'Телефони',
      tablets: 'Планшети',
      accessors: 'Аксесуари',
      models: 'моделі',
      h2Hot: 'Гарячі ціни',

      //characters
      screen: 'Екран',
      capac: 'Ємність',
      ram: 'ОЗП',
      resolution: 'Роздільна здатність',
      proccessor: 'Процессор',
      memory: 'Вбудована пам`ять',
      zoom: 'Приближення',
      camera: 'Камера',
      cell: 'Мобільний зв`язок',

      addCart: 'В корзину',
      addedCart: 'Додано',

      //categories
      sortBy: 'Сортувати по',
      newest: 'Найновіші',
      alph: 'За алфавітом',
      cheap: 'Дешевизною',
      itemsPer: 'Гаджетів за сторінку',
      favourites: 'Вподобані',

      //cart
      cart: 'Корзина',
      total: 'Загалом для ',
      items: ' шт.',
      checkout: 'Оплата',

      //item
      back: 'Назад',
      availCols: 'Доступні кольори',
      selCapac: 'Виберіть ємність',
      h2About: 'Про гаджет',
      h2Tech: 'Технічні характеристики',
      h2AlsoLike: 'Тобі також може сподобатись',

      //footer
      contacts: 'Контакти',
      rights: 'Права',
      backTop: 'На вверх',
      theme: 'Тема:',
      lang: 'Мови:',

      //modal
      modText: 'Оплата ще не дороблена. Бажаєте очистити корзину?',
      yes: 'Так',
      no: 'Ні',
    },
  },
};

i18n
  .use(LanguageDetector) // Визначає мову (localStorage, cookie, браузер)
  .use(initReactI18next) // Інтеграція з React
  .init({
    resources,
    fallbackLng: 'en', // Мова за замовчуванням
    interpolation: {
      escapeValue: false, // Для захисту від XSS (не обов'язково в React)
    },
    detection: {
      order: ['localStorage', 'navigator'], // Порядок визначення мови
      caches: ['localStorage'], // Зберігаємо мову в localStorage
    },
  });

export default i18n;
