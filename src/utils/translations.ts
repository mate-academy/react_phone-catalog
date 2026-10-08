export const translations = {
  en: {
    logo: 'HOME',
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    search: 'Search...',
    favorites: 'Favorites',
    cart: 'Cart',
    backToTop: 'Back to top',
    goTo: 'Go to',

    github: 'GitHub',
    contacts: 'Contacts',
    rights: 'All rights reserved',

    home: 'Home',
    productCatalog: 'Product Catalog',
    hotPrices: 'Hot prices',
    shopByCategory: 'Shop by category',
    newestProducts: 'Newest products',

    sortBy: 'Sort by:',
    newest: 'Newest',
    alphabetically: 'Alphabetically',
    cheapest: 'Cheapest',

    itemsPerPage: 'Items per page:',
    all: 'all',
    prev: 'Prev',
    next: 'Next',
    page: 'Page',
    of: 'of',

    addToCart: 'Add to cart',
    price: 'Price',
    fullPrice: 'Full price:',
    back: 'Back',

    color: 'Color',
    capacity: 'Capacity',
    about: 'About',
    techSpecs: 'Tech specs',
    screen: 'Screen:',
    ram: 'RAM:',
    year: 'Year:',
    youMayAlsoLike: 'You may also like',

    productNotFound: 'Product was not found',
    productTypePhone: 'phone',
    productTypeTablet: 'tablet',
    productTypeAccessory: 'accessory',

    aboutDescription:
      'is a {type} with a {screen} display, {ram} RAM, and {capacity} storage.',
    aboutReleased:
      'This product was released in {year} and is available in {color}.',

    showImage: 'Show image',

    cartEmpty: 'Your cart is empty',
    favoritesEmpty: 'Your favorites are empty',
    totalItems: 'Total items:',
    total: 'Total:',
    checkout: 'Checkout',

    pageNotFound: 'Page not found',
    goToHome: 'Go to Home',

    noPhones: 'There are no phones yet',
    noTablets: 'There are no tablets yet',
    noAccessories: 'There are no accessories yet',

    noPhonesMatching: 'There are no phones matching the query',
    noTabletsMatching: 'There are no tablets matching the query',
    noAccessoriesMatching: 'There are no accessories matching the query',

    somethingWentWrong: 'Something went wrong',
    reload: 'Reload',

    checkoutMessage:
      'Checkout is not implemented yet. Do you want to clear the Cart?',
  },

  ua: {
    logo: 'Головна',
    phones: 'Телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
    search: 'Пошук...',
    favorites: 'Обране',
    cart: 'Кошик',
    backToTop: 'На початок',
    goTo: 'Перейти до',

    github: 'GitHub',
    contacts: 'Контакти',
    rights: 'Всі права захищені',

    home: 'Головна',
    productCatalog: 'Каталог товарів',
    hotPrices: 'Гарячі пропозиції',
    shopByCategory: 'Категорії товарів',
    newestProducts: 'Новинки',

    sortBy: 'Сортувати:',
    newest: 'Новинки',
    alphabetically: 'За алфавітом',
    cheapest: 'Найдешевші',

    itemsPerPage: 'Товарів на сторінці:',
    all: 'всі',
    prev: 'Назад',
    next: 'Далі',
    page: 'Сторінка',
    of: 'з',

    addToCart: 'Додати в кошик',
    price: 'Ціна',
    fullPrice: 'Повна ціна:',
    back: 'Назад',

    color: 'Колір',
    capacity: 'Памʼять',
    about: 'Про товар',
    techSpecs: 'Технічні характеристики',
    screen: 'Екран:',
    ram: 'Оперативна памʼять:',
    year: 'Рік:',
    youMayAlsoLike: 'Вам також може сподобатися',

    productNotFound: 'Товар не знайдено',
    productTypePhone: 'телефон',
    productTypeTablet: 'планшет',
    productTypeAccessory: 'аксесуар',

    aboutDescription:
      '— це {type} з екраном {screen}, {ram} оперативної памʼяті ' +
      'та {capacity} памʼяті.',
    aboutReleased:
      'Цей товар випущено у {year} році та він доступний ' +
      'у кольорі {color}.',

    showImage: 'Показати зображення',

    cartEmpty: 'Ваш кошик порожній',
    favoritesEmpty: 'Обране порожнє',
    totalItems: 'Всього товарів:',
    total: 'Разом:',
    checkout: 'Оформити замовлення',

    pageNotFound: 'Сторінку не знайдено',
    goToHome: 'На головну',

    noPhones: 'Телефонів поки немає',
    noTablets: 'Планшетів поки немає',
    noAccessories: 'Аксесуарів поки немає',

    noPhonesMatching: 'Немає телефонів, що відповідають запиту',
    noTabletsMatching: 'Немає планшетів, що відповідають запиту',
    noAccessoriesMatching: 'Немає аксесуарів, що відповідають запиту',

    somethingWentWrong: 'Щось пішло не так',
    reload: 'Спробувати ще раз',

    checkoutMessage: 'Оформлення замовлення ще не реалізовано. Очистити кошик?',
  },
} as const;

export type Language = keyof typeof translations;

export type TranslationKey = keyof typeof translations.en;
