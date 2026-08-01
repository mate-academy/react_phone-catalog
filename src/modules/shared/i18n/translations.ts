export type Language = 'en' | 'uk';

export const LANGUAGES: Language[] = ['en', 'uk'];

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'EN',
  uk: 'UK',
};

const en = {
  'nav.home': 'Home',
  'nav.phones': 'Phones',
  'nav.tablets': 'Tablets',
  'nav.accessories': 'Accessories',

  'header.favourites': 'Favourites',
  'header.cart': 'Cart',
  'header.openMenu': 'Open menu',
  'header.closeMenu': 'Close menu',
  'header.theme': 'Switch to the other color theme',
  'header.language': 'Language',
  'header.logo': 'Nice Gadgets logo',

  'search.placeholder.phones': 'Search in phones...',
  'search.placeholder.tablets': 'Search in tablets...',
  'search.placeholder.accessories': 'Search in accessories...',
  'search.placeholder.favourites': 'Search in favourites...',
  'search.clear': 'Clear the search',

  'footer.github': 'Github',
  'footer.contacts': 'Contacts',
  'footer.rights': 'Rights',
  'footer.backToTop': 'Back to top',

  'common.somethingWentWrong': 'Something went wrong',
  'common.reload': 'Reload',
  'common.back': 'Back',
  'common.addToCart': 'Add to cart',
  'common.addedToCart': 'Added to cart',
  'common.addToFavourites': 'Add to favourites',
  'common.removeFromFavourites': 'Remove from favourites',

  'models.one': '{count} model',
  'models.few': '{count} models',
  'models.many': '{count} models',

  'items.one': '{count} item',
  'items.few': '{count} items',
  'items.many': '{count} items',

  'home.title': 'Product Catalog',
  'home.welcome': 'Welcome to Nice Gadgets store!',
  'home.brandNew': 'Brand new models',
  'home.hotPrices': 'Hot prices',
  'home.shopByCategory': 'Shop by category',
  'home.category.phones': 'Mobile phones',
  'home.category.tablets': 'Tablets',
  'home.category.accessories': 'Accessories',

  'slider.prevPicture': 'Previous picture',
  'slider.nextPicture': 'Next picture',
  'slider.showPicture': 'Show picture {index}',
  'slider.prevProducts': 'Previous products',
  'slider.nextProducts': 'Next products',
  'slider.bannerPhones': 'Phones banner',
  'slider.bannerTablets': 'Tablets banner',
  'slider.bannerAccessories': 'Accessories banner',

  'products.title.phones': 'Phones page',
  'products.title.tablets': 'Tablets page',
  'products.title.accessories': 'Accessories page',
  'products.empty.phones': 'There are no phones yet',
  'products.empty.tablets': 'There are no tablets yet',
  'products.empty.accessories': 'There are no accessories yet',
  'products.noMatch.phones': 'There are no phones matching the query',
  'products.noMatch.tablets': 'There are no tablets matching the query',
  'products.noMatch.accessories': 'There are no accessories matching the query',
  'products.noMatch.products': 'There are no products matching the query',
  'products.sortBy': 'Sort by',
  'products.sort.age': 'Newest',
  'products.sort.title': 'Alphabetically',
  'products.sort.price': 'Cheapest',
  'products.itemsOnPage': 'Items on page',
  'products.all': 'All',

  'pagination.label': 'Pagination',
  'pagination.prev': 'Previous page',
  'pagination.next': 'Next page',

  'details.about': 'About',
  'details.techSpecs': 'Tech specs',
  'details.youMayAlsoLike': 'You may also like',
  'details.notFound': 'Product was not found',
  'details.availableColors': 'Available colors',
  'details.selectCapacity': 'Select capacity',
  'details.showPhoto': 'Show photo {index}',

  'specs.screen': 'Screen',
  'specs.resolution': 'Resolution',
  'specs.processor': 'Processor',
  'specs.ram': 'RAM',
  'specs.capacity': 'Capacity',
  'specs.builtInMemory': 'Built in memory',
  'specs.camera': 'Camera',
  'specs.zoom': 'Zoom',
  'specs.cell': 'Cell',

  'cart.title': 'Cart',
  'cart.totalFor.one': 'Total for {count} item',
  'cart.totalFor.few': 'Total for {count} items',
  'cart.totalFor.many': 'Total for {count} items',
  'cart.checkout': 'Checkout',
  'cart.empty': 'Your cart is empty',
  'cart.startShopping': 'Start shopping',
  'cart.remove': 'Remove {name} from the cart',
  'cart.increase': 'Increase quantity',
  'cart.decrease': 'Decrease quantity',
  'cart.modalText':
    'Checkout is not implemented yet. Do you want to clear the Cart?',
  'cart.cancel': 'Cancel',
  'cart.confirm': 'Confirm',

  'favourites.title': 'Favourites',
  'favourites.empty': 'There are no favourites yet',

  'notFound.title': 'Page not found',
  'notFound.goHome': 'Go to Home page',

  'breadcrumbs.home': 'Home',
  'breadcrumbs.label': 'Breadcrumbs',
};

export type TranslationKey = keyof typeof en;

const uk: Record<TranslationKey, string> = {
  'nav.home': 'Головна',
  'nav.phones': 'Телефони',
  'nav.tablets': 'Планшети',
  'nav.accessories': 'Аксесуари',

  'header.favourites': 'Обрані',
  'header.cart': 'Кошик',
  'header.openMenu': 'Відкрити меню',
  'header.closeMenu': 'Закрити меню',
  'header.theme': 'Перемкнути кольорову тему',
  'header.language': 'Мова',
  'header.logo': 'Логотип Nice Gadgets',

  'search.placeholder.phones': 'Пошук серед телефонів...',
  'search.placeholder.tablets': 'Пошук серед планшетів...',
  'search.placeholder.accessories': 'Пошук серед аксесуарів...',
  'search.placeholder.favourites': 'Пошук серед обраних...',
  'search.clear': 'Очистити пошук',

  'footer.github': 'Github',
  'footer.contacts': 'Контакти',
  'footer.rights': 'Права',
  'footer.backToTop': 'Догори',

  'common.somethingWentWrong': 'Щось пішло не так',
  'common.reload': 'Спробувати ще раз',
  'common.back': 'Назад',
  'common.addToCart': 'Додати в кошик',
  'common.addedToCart': 'Додано в кошик',
  'common.addToFavourites': 'Додати в обрані',
  'common.removeFromFavourites': 'Видалити з обраних',

  'models.one': '{count} модель',
  'models.few': '{count} моделі',
  'models.many': '{count} моделей',

  'items.one': '{count} товар',
  'items.few': '{count} товари',
  'items.many': '{count} товарів',

  'home.title': 'Каталог товарів',
  'home.welcome': 'Ласкаво просимо до магазину Nice Gadgets!',
  'home.brandNew': 'Новинки',
  'home.hotPrices': 'Гарячі ціни',
  'home.shopByCategory': 'Обирайте за категорією',
  'home.category.phones': 'Мобільні телефони',
  'home.category.tablets': 'Планшети',
  'home.category.accessories': 'Аксесуари',

  'slider.prevPicture': 'Попереднє зображення',
  'slider.nextPicture': 'Наступне зображення',
  'slider.showPicture': 'Показати зображення {index}',
  'slider.prevProducts': 'Попередні товари',
  'slider.nextProducts': 'Наступні товари',
  'slider.bannerPhones': 'Банер телефонів',
  'slider.bannerTablets': 'Банер планшетів',
  'slider.bannerAccessories': 'Банер аксесуарів',

  'products.title.phones': 'Телефони',
  'products.title.tablets': 'Планшети',
  'products.title.accessories': 'Аксесуари',
  'products.empty.phones': 'Телефонів ще немає',
  'products.empty.tablets': 'Планшетів ще немає',
  'products.empty.accessories': 'Аксесуарів ще немає',
  'products.noMatch.phones': 'Немає телефонів за цим запитом',
  'products.noMatch.tablets': 'Немає планшетів за цим запитом',
  'products.noMatch.accessories': 'Немає аксесуарів за цим запитом',
  'products.noMatch.products': 'Немає товарів за цим запитом',
  'products.sortBy': 'Сортувати за',
  'products.sort.age': 'Новизною',
  'products.sort.title': 'Абеткою',
  'products.sort.price': 'Ціною',
  'products.itemsOnPage': 'Товарів на сторінці',
  'products.all': 'Усі',

  'pagination.label': 'Пагінація',
  'pagination.prev': 'Попередня сторінка',
  'pagination.next': 'Наступна сторінка',

  'details.about': 'Про товар',
  'details.techSpecs': 'Технічні характеристики',
  'details.youMayAlsoLike': 'Вам також може сподобатись',
  'details.notFound': 'Товар не знайдено',
  'details.availableColors': 'Доступні кольори',
  'details.selectCapacity': "Оберіть об'єм пам'яті",
  'details.showPhoto': 'Показати фото {index}',

  'specs.screen': 'Екран',
  'specs.resolution': 'Роздільна здатність',
  'specs.processor': 'Процесор',
  'specs.ram': 'Оперативна пам’ять',
  'specs.capacity': 'Об’єм пам’яті',
  'specs.builtInMemory': 'Вбудована пам’ять',
  'specs.camera': 'Камера',
  'specs.zoom': 'Зум',
  'specs.cell': 'Зв’язок',

  'cart.title': 'Кошик',
  'cart.totalFor.one': 'Разом за {count} товар',
  'cart.totalFor.few': 'Разом за {count} товари',
  'cart.totalFor.many': 'Разом за {count} товарів',
  'cart.checkout': 'Оформити',
  'cart.empty': 'Ваш кошик порожній',
  'cart.startShopping': 'Перейти до покупок',
  'cart.remove': 'Видалити {name} з кошика',
  'cart.increase': 'Збільшити кількість',
  'cart.decrease': 'Зменшити кількість',
  'cart.modalText': 'Оформлення ще не реалізоване. Очистити кошик?',
  'cart.cancel': 'Скасувати',
  'cart.confirm': 'Підтвердити',

  'favourites.title': 'Обрані',
  'favourites.empty': 'Обраних товарів ще немає',

  'notFound.title': 'Сторінку не знайдено',
  'notFound.goHome': 'На головну сторінку',

  'breadcrumbs.home': 'Головна',
  'breadcrumbs.label': 'Навігаційний ланцюжок',
};

export const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  en,
  uk,
};

export type PluralForm = 'one' | 'few' | 'many';

/**
 * English only distinguishes one from the rest; Ukrainian needs all three
 * Slavic forms.
 */
export const getPluralForm = (
  language: Language,
  count: number,
): PluralForm => {
  if (language === 'en') {
    return count === 1 ? 'one' : 'many';
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'one';
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return 'few';
  }

  return 'many';
};
