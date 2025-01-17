const uk = {
  welcomeMessage: 'Ласкаво просимо до React та react-i18next',
  header: {
    navigation: {
      home: 'ГОЛОВНА',
      phones: 'ТЕЛЕФОНИ',
      tablets: 'ПЛАНШЕТИ',
      accessories: 'АКСЕСУАРИ',
    },
    languageSwitcher: 'EN',
    themeSwitcher: {
      light: 'темна',
      dark: 'світла',
    },
  },

  search: {
    placeholder: 'Пошук серед {{category}}',
    categories: {
      phones: 'телефонів',
      tablets: 'планшетів',
      accessories: 'аксесуарів',
    },
  },

  footer: {
    contacts: 'КОНТАКТИ',
    rights: 'ПРАВА',
    backToTop: 'На початок',
    notificationAlert:
      // eslint-disable-next-line max-len
      'Ви збираєтесь покинути цю сторінку і перейти на GitHub профіль розробника цього проєкту. Бажаєте продовжити?',
    rightsAlert:
      // eslint-disable-next-line max-len
      'Це макет реалізації. Повна функціональність буде доступна найближчим часом!',
  },

  homePage: {
    title: 'Ласкаво просимо до магазину "Nice Gadgets"!',
    brandNewModels: 'Нові моделі',
    hotPrices: 'Гарячі ціни',
    categories: {
      mainTitle: 'Купуйте за категоріями',
      phonesTitle: 'Мобільні телефони',
      tabletsTitle: 'Планшети',
      accessoriesTitle: 'Аксесуари',
      count_one: '{{count}} модель',
      count_few: '{{count}} моделі',
      count_many: '{{count}} моделей',
      count_other: '{{count}} моделей',
      shopLatest: 'Купуйте новітні {{category}}',
      performanceAndStyle: 'Потужність і стиль у ваших руках!',
    },
  },

  breadCrumbs: {
    phones: 'Мобільні телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
    favorites: 'Обрані',
  },

  sortByDropdown: {
    title: 'Сортувати за',
    option: {
      newest: 'Найновіші',
      alphabetically: 'Алфавітом',
      cheapest: 'Найдешевші',
    },
    placeholder: 'Оберіть опцію',
  },

  itemsPerPageDropdown: {
    title: 'Кількість на сторінці',
    all: 'Всі',
  },

  phonesPage: {
    title: 'Мобільні телефони',
    count_one: '{{count}} модель',
    count_few: '{{count}} моделі',
    count_many: '{{count}} моделей',
    count_other: '{{count}} моделей',
  },

  tabletsPage: {
    title: 'Планшети',
    count_one: '{{count}} модель',
    count_few: '{{count}} моделі',
    count_many: '{{count}} моделей',
    count_other: '{{count}} моделей',
  },

  accessoriesPage: {
    title: 'Аксесуари',
    count_one: '{{count}} модель',
    count_few: '{{count}} моделі',
    count_many: '{{count}} моделей',
    count_other: '{{count}} моделей',
  },

  favoritesPage: {
    title: 'Обрані',
    count_one: '{{count}} модель',
    count_few: '{{count}} моделі',
    count_many: '{{count}} моделей',
    count_other: '{{count}} моделей',
    empty:
      // eslint-disable-next-line max-len
      'У вас ще немає обраного. \nДосліджуйте та додавайте свої улюблені варіанти!',
  },

  productDetailsPage: {
    suggestionsTitle: 'Вам також може сподобатися',
    screen: 'Екран',
    processor: 'Процесор',
    resolution: 'Роздільна здатність',
    capacity: 'Ємність',
    ram: 'ОЗП',
    about: 'Про продукт',
    techSpecs: 'Технічні характеристики',
    builtInMemory: "Вбудована пам'ять",
    camera: 'Камера',
    zoom: 'Зум',
    cell: 'Мережа',
  },

  colorSelection: {
    title: 'Доступні кольори',
  },

  capacitySelection: {
    title: 'Виберіть ємність',
  },

  cartPage: {
    title: 'Кошик',
    totalFor: 'Загальна вартість для {{count}} {{items}}',
    items: {
      one: 'товарy',
      few: 'товарів',
      many: 'товарів',
      other: 'товарів',
    },
    emptyCart: 'Ваш кошик порожній',
    checkout: 'Оплата',
  },

  modal: {
    title: 'Оформлення замовлення ще не реалізовано.',
    message: 'Ви хочете очистити кошик?',
    confirmBtn: 'Підтвердити',
    cancelBtn: 'Скасувати',
  },

  notFoundPage: {
    message: 'Упс!',
    title: 'Сторінку не знайдено',
    backHome: 'Повернутися на головну сторінку',
  },

  productNotFoundPage: {
    phones: 'Телефони не знайдено.\nБудь ласка, спробуйте ще раз!',
    tablets: 'Планшети не знайдено.\nБудь ласка, спробуйте ще раз!',
    accessories: 'Аксесуари не знайдено.\nБудь ласка, спробуйте ще раз!',
    titleOutOfStock: 'Незабаром у продажу: товар відсутній на складі',
  },

  buttonBack: {
    back: 'Назад',
  },

  productCard: {
    specs: {
      screen: 'Екран',
      capacity: 'Ємність',
      ram: 'ОЗП',
    },

    button: {
      add: 'Додати до кошика',
      added: 'Додано до кошика',
    },

    toast: {
      added: '{{name}} було додано до кошика!',
      removed: '{{name}} було видалено з кошика!',
    },
  },
};

export default uk;
