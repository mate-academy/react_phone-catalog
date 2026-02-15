import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { bannerTranslations } from './components/BannerSlider/bannerTranslations';
import { categoryTranslations } from './components/ShopByCategory/categoryTranslations';
import { productsSliderTranslations } from './components/ProductsSlider/ProductsSliderTranslations';
import { favouritesPageTranslations } from './pages/favorite-page/favouritesPageTranslations';
import { breadcrumbTranslations } from './components/Breadcrumb/breadcrumbTranslations';
import { notFoundPageTranslations } from './pages/not-found-page/notFoundPageTranslations';
import { cartPageTranslations } from './pages/cart-page/cartPageTranslations';
import { productPagesTranslations } from './components/ProductsPage/productPagesTranslations';
import { productDetailsTranslations } from './pages/product-details-page/productDetailsTranslations';
import { rightsPageTranslations } from './pages/rights-page/RightsTranslation';
import { contactsPageTranslations } from './pages/contact-us-page/ContactsTranslations';
import { productDescriptionTranslations } from './components/ProductDescription/productDescriptionTranslations';

// Translation resources
const resources = {
  en: {
    translation: {
      ...bannerTranslations.en,
      ...categoryTranslations.en,
      ...productsSliderTranslations.en,
      ...favouritesPageTranslations.en,
      ...breadcrumbTranslations.en,
      ...notFoundPageTranslations.en,
      ...cartPageTranslations.en,
      ...productPagesTranslations.en,
      ...productDetailsTranslations.en,
      ...rightsPageTranslations.en,
      ...contactsPageTranslations.en,
      ...productDescriptionTranslations.en,

      // Navigation
      'nav.home': 'HOME',
      'nav.phones': 'PHONES',
      'nav.tablets': 'TABLETS',
      'nav.accessories': 'ACCESSORIES',

      // Header
      'header.home': 'Home',
      'header.phones': 'Phones',
      'header.tablets': 'Tablets',
      'header.accessories': 'Accessories',
      'header.favorites': 'Favorites',
      'header.cart': 'Cart',

      // Language Switcher
      'language.english': 'English',
      'language.ukrainian': 'Українська',

      // Theme
      'theme.lightMode': 'LIGHT',
      'theme.darkMode': 'DARK',

      // Product Card
      'product.addToCart': 'Add to cart',
      'product.added': 'Added',
      'product.screen': 'Screen',
      'product.capacity': 'Capacity',
      'product.ram': 'RAM',

      // Home Page
      'home.welcomeTitle': 'Welcome to Nice Gadgets store!',

      // Product Details
      'productDetails.about': 'About',
      'productDetails.techSpecs': 'Tech specs',
      'productDetails.available': 'Available',
      'productDetails.colors': 'Available colors',
      'productDetails.capacities': 'Select capacity',
      'productDetails.youMayAlsoLike': 'You may also like',
      'productDetails.back': 'Back',

      // Cart
      'cart.title': 'Cart',
      'cart.yourCartIsEmpty': 'Your cart is empty',
      'cart.total': 'Total',
      'cart.items': 'items',
      'cart.checkout': 'Checkout',
      'cart.checkoutMessage': 'Checkout is not implemented yet. Do you want to clear the Cart?',

      // Favorites
      'favorites.title': 'Favorites',
      'favorites.noFavorites': 'No favorites yet',

      // Pagination
      'pagination.itemsOnPage': 'Items on page',
      'pagination.all': 'All',

      // Sort
      'sort.sortBy': 'Sort by',
      'sort.newest': 'Newest',
      'sort.alphabetically': 'Alphabetically',
      'sort.cheapest': 'Cheapest',

      // Search
      'search.search': 'Search',
      'search.searchPlaceholder': 'Search in',
      'search.noResults': 'No products found',

      // Not Found
      'notFound.pageNotFound': 'Page not found',
      'notFound.pageNotFoundDescription': "The page you're looking for doesn't exist or has been moved.",
      'notFound.backToHome': 'Back to Home',

      // Footer
      'footer.github': 'GITHUB',
      'footer.contacts': 'CONTACTS',
      'footer.rights': 'RIGHTS',
      'footer.backToTop': 'Back to top',

      // Errors
      'error.somethingWentWrong': 'Something went wrong',
      'error.retry': 'Retry',
      'error.loading': 'Loading...',
    },
  },
  ua: {
    translation: {
      ...bannerTranslations.ua,
      ...categoryTranslations.ua,
      ...productsSliderTranslations.ua,
      ...favouritesPageTranslations.ua,
      ...breadcrumbTranslations.ua,
      ...notFoundPageTranslations.ua,
      ...cartPageTranslations.ua,
      ...productPagesTranslations.ua,
      ...productDetailsTranslations.ua,
      ...rightsPageTranslations.ua,
      ...contactsPageTranslations.ua,
      ...productDescriptionTranslations.ua,

      // Navigation
      'nav.home': 'ГОЛОВНА',
      'nav.phones': 'ТЕЛЕФОНИ',
      'nav.tablets': 'ПЛАНШЕТИ',
      'nav.accessories': 'АКСЕСУАРИ',

      // Header
      'header.home': 'Головна',
      'header.phones': 'Телефони',
      'header.tablets': 'Планшети',
      'header.accessories': 'Аксесуари',
      'header.favorites': 'Вибране',
      'header.cart': 'Кошик',

      // Language Switcher
      'language.english': 'English',
      'language.ukrainian': 'Українська',

      // Theme
      'theme.lightMode': 'СВІТЛА',
      'theme.darkMode': 'ТЕМНА',

      // Product Card
      'product.addToCart': 'Додати до кошика',
      'product.added': 'Додано',
      'product.screen': 'Екран',
      'product.capacity': "Пам'ять",
      'product.ram': "Оперативна пам'ять",

      // Home Page
      'home.welcomeTitle': 'Ласкаво просимо до магазину Nice Gadgets!',

      // Product Details
      'productDetails.about': 'Про товар',
      'productDetails.techSpecs': 'Технічні характеристики',
      'productDetails.available': 'Доступно',
      'productDetails.colors': 'Доступні кольори',
      'productDetails.capacities': "Оберіть пам'ять",
      'productDetails.youMayAlsoLike': 'Вам також може сподобатися',
      'productDetails.back': 'Назад',

      // Cart
      'cart.title': 'Кошик',
      'cart.yourCartIsEmpty': 'Ваш кошик порожній',
      'cart.total': 'Разом',
      'cart.items': 'товарів',
      'cart.checkout': 'Оформити',
      'cart.checkoutMessage': 'Оформлення замовлення ще не реалізовано. Очистити кошик?',

      // Favorites
      'favorites.title': 'Вибране',
      'favorites.noFavorites': 'Немає вибраних товарів',

      // Pagination
      'pagination.itemsOnPage': 'Товарів на сторінці',
      'pagination.all': 'Всі',

      // Sort
      'sort.sortBy': 'Сортувати за',
      'sort.newest': 'Новинки',
      'sort.alphabetically': 'За алфавітом',
      'sort.cheapest': 'Дешевші',

      // Search
      'search.search': 'Пошук',
      'search.searchPlaceholder': 'Шукати в',
      'search.noResults': 'Товари не знайдено',

      // Not Found
      'notFound.pageNotFound': 'Сторінку не знайдено',
      'notFound.pageNotFoundDescription': 'Сторінка, яку ви шукаєте, не існує або була переміщена.',
      'notFound.backToHome': 'Повернутися на головну',

      // Footer
      'footer.github': 'GITHUB',
      'footer.contacts': 'КОНТАКТИ',
      'footer.rights': 'ПРАВА',
      'footer.backToTop': 'Нагору',

      // Errors
      'error.somethingWentWrong': 'Щось пішло не так',
      'error.retry': 'Спробувати ще раз',
      'error.loading': 'Завантаження...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
