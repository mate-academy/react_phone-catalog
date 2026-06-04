export const ua = {
  productCart: {
    screen: 'Екран',
    capacity: 'Памʼять',
    RAM: 'ОЗП',
    button: 'Додати в кошик',
    buttonSelected: 'Додано',
    processor: 'Процесор',
    resolution: 'Роздільна здатність',
    builtInMemory: 'Вбудована памʼять',
    camera: 'Камера',
    zoom: 'Зум',
    cell: 'Мережа',
  },

  HomeTitle: {
    welcome: 'Ласкаво просимо до магазину Nice Gadgets!',
    hotPrice: 'Гарячі пропозиції',
    newBrand: 'Нові моделі',
  },

  productPage: {
    mobileTitle: 'Мобільні телефони',
    tabletsTitle: 'Планшети',
    accessoriesTitle: 'Аксесуари',
    models: 'моделей',
    sortByTitle: 'Сортувати за',
    sortBy: {
      newest: 'Новинками',
      alphabetically: 'Алфавітом',
      cheapest: 'Найдешевшими',
    },
    itemsOnPageTitle: 'Товарів на сторінці',
    search: 'Пошук',
  },

  buttonBack: 'Назад',

  errors: { ProductDontFound: 'Product was not found', pageNotFound: 'Сторінку не знайдено' },

  productDetails: {
    availableColors: 'Доступні кольори',
    selectCapacity: 'Оберіть памʼять',
    about: 'Про товар',
    techSpecs: 'Технічні характеристики',
  },

  AreNoProductsYet: 'Поки що немає товарів',

  favouritesPage: {
    favouritesTitle: 'Обране',
    empty: 'Ваш список обраного порожній',
    addYourFirstProduct: 'Додайте свій перший товар до списку бажань',
  },

  sectionYouMayAlsoLike: 'Вам також може сподобатися',

  cart: {
    cart: 'Кошик',
    checkout: 'Оформити замовлення',
    total: 'Всього',
  },

  sectionCategories: {
    title: 'Покупки за категоріями',
    modile: 'Телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
    models: 'моделей',
    model: 'модель',
    items: 'товарів',
    item: 'товар',
  },

  footer: {
    backToTop: 'Повернутись нагору',
    contacts: 'Контакти',
    right: 'Права',
  },

  navigation: {
    favourites: 'Обране',
    home: 'Головна',
    phones: 'Телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
  },
  banners: {
    phone: {
      title: 'Тепер доступно <0/> у нашому магазині!',
      p: 'Будь першим!',
      button: 'Замовити зараз',
    },

    tablets: {
      title: 'Нові планшети вже тут!',
      p: 'Продуктивність без обмежень!',
      button: 'Купити',
    },

    accessories: {
      title: 'Доповни свій комплект!',
      p: 'Усе, що тобі потрібно!',
      button: 'Дивитися більше',
    },
  },
} as const;

export default ua;
