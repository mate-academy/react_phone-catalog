import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        category: 'Category',
        cart: 'Cart',
        favorites: 'Favorites',
        addToCart: 'Add to Cart',
        removeFavorite: 'Remove from Favorites',
        addFavorite: 'Add to Favorites',
        error: 'Something went wrong',
        productNotFound: 'Product not found',
        search: 'Search...',
        sort: 'Sort by',
        priceLowToHigh: 'Price: Low to High',
        priceHighToLow: 'Price: High to Low',
        backToTop: 'Back to Top',
        hotPrices: 'Hot Prices',
        newProducts: 'New Products',
        cartEmpty: 'Your cart is empty',
        favoritesEmpty: 'Your favorites list is empty',
        pageNotFound: 'Page not found',
        backToHome: 'Back to Home',
      },
    },
    ua: {
      translation: {
        home: 'Головна',
        category: 'Категорія',
        cart: 'Кошик',
        favorites: 'Обране',
        addToCart: 'Додати в кошик',
        removeFavorite: 'Видалити з обраного',
        addFavorite: 'Додати в обране',
        error: 'Щось пішло не так',
        productNotFound: 'Продукт не знайдено',
        search: 'Пошук...',
        sort: 'Сортувати за',
        priceLowToHigh: 'Ціна: від низької до високої',
        priceHighToLow: 'Ціна: від високої до низької',
        backToTop: 'Повернутися вверх',
        hotPrices: 'Гарячі ціни',
        newProducts: 'Нові продукти',
        cartEmpty: 'Ваш кошик порожній',
        favoritesEmpty: 'Ваш список обраного порожній',
        pageNotFound: 'Сторінку не знайдено',
        backToHome: 'Повернутися додому',
      },
    },
  },
  lng: 'ua',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
