import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Language = 'en' | 'uk';

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.phones': 'Phones',
    'nav.tablets': 'Tablets',
    'nav.accessories': 'Accessories',
    'nav.favorites': 'Favorites',
    'nav.cart': 'Cart',
    'header.logoAlt': 'Nice Gadgets logo',
    'header.navigation': 'Main navigation',
    'header.mobileNavigation': 'Mobile navigation',
    'header.openMenu': 'Open menu',
    'header.closeMenu': 'Close menu',
    'header.lightTheme': 'Switch to light theme',
    'header.darkTheme': 'Switch to dark theme',
    'header.theme': 'Theme',
    'header.dark': 'Dark',
    'header.light': 'Light',
    'header.language': 'Change language',
    'header.preferences': 'Display preferences',
    'header.search': 'Search in {section}...',
    'header.searchShort': 'Search...',
    'header.searchLabel': 'Search {section}',
    'home.catalog': 'Product Catalog',
    'home.welcome': 'Welcome to Nice Gadgets store!',
    'home.hotPrices': 'Hot prices',
    'home.brandNew': 'Brand new models',
    'home.shopByCategory': 'Shop by category',
    'home.mobilePhones': 'Mobile phones',
    'home.models': {
      one: '{count} model',
      other: '{count} models',
    },
    'catalog.phonesTitle': 'Mobile phones',
    'catalog.tabletsTitle': 'Tablets page',
    'catalog.accessoriesTitle': 'Accessories page',
    'catalog.models': {
      one: '{count} model',
      other: '{count} models',
    },
    'catalog.sortBy': 'Sort by',
    'catalog.itemsOnPage': 'Items on page',
    'catalog.newest': 'Newest',
    'catalog.alphabetically': 'Alphabetically',
    'catalog.cheapest': 'Cheapest',
    'catalog.all': 'All',
    'catalog.phonesEmpty': 'There are no phones yet',
    'catalog.tabletsEmpty': 'There are no tablets yet',
    'catalog.accessoriesEmpty': 'There are no accessories yet',
    'catalog.phonesNoMatches': 'There are no phones matching the query',
    'catalog.tabletsNoMatches': 'There are no tablets matching the query',
    'catalog.accessoriesNoMatches':
      'There are no accessories matching the query',
    'common.somethingWrong': 'Something went wrong',
    'common.reload': 'Reload',
    'common.back': 'Back',
    'common.home': 'Home',
    'common.loading': 'Loading...',
    'common.loadingProducts': 'Loading products',
    'common.loadingProductDetails': 'Loading product details',
    'product.addToCart': 'Add to cart',
    'product.addedToCart': 'Added to cart',
    'product.addFavorite': 'Add {name} to favorites',
    'product.removeFavorite': 'Remove {name} from favorites',
    'product.screen': 'Screen',
    'product.capacity': 'Capacity',
    'product.ram': 'RAM',
    'product.ramShort': 'RAM',
    'product.about': 'About',
    'product.techSpecs': 'Tech specs',
    'product.availableColors': 'Available colors',
    'product.selectCapacity': 'Select capacity',
    'product.camera': 'Camera',
    'product.zoom': 'Zoom',
    'product.cell': 'Cell',
    'product.resolution': 'Resolution',
    'product.processor': 'Processor',
    'product.builtInMemory': 'Built in memory',
    'product.id': 'ID: {id}',
    'product.options': 'Product options',
    'product.showImage': 'Show image {number}',
    'product.suggestions': 'You may also like',
    'product.notFound': 'Product was not found',
    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty',
    'cart.totalFor': {
      one: 'Total for {count} item',
      other: 'Total for {count} items',
    },
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove {name} from cart',
    'cart.decrease': 'Decrease quantity',
    'cart.increase': 'Increase quantity',
    'cart.quantity': 'Product quantity',
    'cart.orderSummary': 'Order summary',
    'cart.checkoutConfirm':
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    'favorites.title': 'Favorites',
    'favorites.item': '{count} item',
    'favorites.items': {
      one: '{count} item',
      other: '{count} items',
    },
    'favorites.empty': 'There are no favorite products yet',
    'favorites.noMatches': 'There are no products matching the query',
    'footer.github': 'GitHub',
    'footer.contacts': 'Contacts',
    'footer.rights': 'Rights',
    'footer.backToTop': 'Back to top',
    'footer.navigation': 'Footer navigation',
    'notFound.title': 'Page not found',
    'notFound.home': 'Go to Home page',
    'breadcrumb.label': 'Breadcrumb',
    'pagination.label': 'Catalog pagination',
    'pagination.previous': 'Previous page',
    'pagination.next': 'Next page',
    'slider.previous': 'Show previous products',
    'slider.next': 'Show next products',
    'pictures.previous': 'Previous slide',
    'pictures.next': 'Next slide',
    'pictures.banner': 'Promotional banner',
    'pictures.goTo': 'Go to slide {number}',
  },
  uk: {
    'nav.home': 'Головна',
    'nav.phones': 'Телефони',
    'nav.tablets': 'Планшети',
    'nav.accessories': 'Аксесуари',
    'nav.favorites': 'Обране',
    'nav.cart': 'Кошик',
    'header.logoAlt': 'Логотип Nice Gadgets',
    'header.navigation': 'Головна навігація',
    'header.mobileNavigation': 'Мобільна навігація',
    'header.openMenu': 'Відкрити меню',
    'header.closeMenu': 'Закрити меню',
    'header.lightTheme': 'Увімкнути світлу тему',
    'header.darkTheme': 'Увімкнути темну тему',
    'header.theme': 'Тема',
    'header.dark': 'Темна',
    'header.light': 'Світла',
    'header.language': 'Змінити мову',
    'header.preferences': 'Налаштування відображення',
    'header.search': 'Пошук у розділі «{section}»...',
    'header.searchShort': 'Пошук...',
    'header.searchLabel': 'Шукати в розділі «{section}»',
    'home.catalog': 'Каталог товарів',
    'home.welcome': 'Ласкаво просимо до магазину Nice Gadgets!',
    'home.hotPrices': 'Гарячі ціни',
    'home.brandNew': 'Нові моделі',
    'home.shopByCategory': 'Категорії товарів',
    'home.mobilePhones': 'Мобільні телефони',
    'home.models': {
      one: '{count} модель',
      few: '{count} моделі',
      many: '{count} моделей',
      other: '{count} моделі',
    },
    'catalog.phonesTitle': 'Мобільні телефони',
    'catalog.tabletsTitle': 'Сторінка планшетів',
    'catalog.accessoriesTitle': 'Сторінка аксесуарів',
    'catalog.models': {
      one: '{count} модель',
      few: '{count} моделі',
      many: '{count} моделей',
      other: '{count} моделі',
    },
    'catalog.sortBy': 'Сортувати за',
    'catalog.itemsOnPage': 'Товарів на сторінці',
    'catalog.newest': 'Новизною',
    'catalog.alphabetically': 'Алфавітом',
    'catalog.cheapest': 'Ціною',
    'catalog.all': 'Усі',
    'catalog.phonesEmpty': 'Телефонів поки немає',
    'catalog.tabletsEmpty': 'Планшетів поки немає',
    'catalog.accessoriesEmpty': 'Аксесуарів поки немає',
    'catalog.phonesNoMatches': 'Телефонів за вашим запитом не знайдено',
    'catalog.tabletsNoMatches': 'Планшетів за вашим запитом не знайдено',
    'catalog.accessoriesNoMatches': 'Аксесуарів за вашим запитом не знайдено',
    'common.somethingWrong': 'Щось пішло не так',
    'common.reload': 'Повторити',
    'common.back': 'Назад',
    'common.home': 'Головна',
    'common.loading': 'Завантаження...',
    'common.loadingProducts': 'Завантаження товарів',
    'common.loadingProductDetails': 'Завантаження інформації про товар',
    'product.addToCart': 'Додати до кошика',
    'product.addedToCart': 'У кошику',
    'product.addFavorite': 'Додати {name} до обраного',
    'product.removeFavorite': 'Видалити {name} з обраного',
    'product.screen': 'Екран',
    'product.capacity': 'Пам’ять',
    'product.ram': 'Оперативна пам’ять',
    'product.ramShort': 'ОЗП',
    'product.about': 'Опис',
    'product.techSpecs': 'Характеристики',
    'product.availableColors': 'Доступні кольори',
    'product.selectCapacity': 'Оберіть обсяг пам’яті',
    'product.camera': 'Камера',
    'product.zoom': 'Зум',
    'product.cell': 'Зв’язок',
    'product.resolution': 'Роздільна здатність',
    'product.processor': 'Процесор',
    'product.builtInMemory': 'Вбудована пам’ять',
    'product.id': 'ID: {id}',
    'product.options': 'Параметри товару',
    'product.showImage': 'Показати зображення {number}',
    'product.suggestions': 'Вам також може сподобатися',
    'product.notFound': 'Товар не знайдено',
    'cart.title': 'Кошик',
    'cart.empty': 'Ваш кошик порожній',
    'cart.totalFor': {
      one: 'Усього за {count} товар',
      few: 'Усього за {count} товари',
      many: 'Усього за {count} товарів',
      other: 'Усього за {count} товару',
    },
    'cart.checkout': 'Оформити замовлення',
    'cart.remove': 'Видалити {name} з кошика',
    'cart.decrease': 'Зменшити кількість',
    'cart.increase': 'Збільшити кількість',
    'cart.quantity': 'Кількість товару',
    'cart.orderSummary': 'Підсумок замовлення',
    'cart.checkoutConfirm': 'Оформлення ще не реалізовано. Очистити кошик?',
    'favorites.title': 'Обране',
    'favorites.item': '{count} товар',
    'favorites.items': {
      one: '{count} товар',
      few: '{count} товари',
      many: '{count} товарів',
      other: '{count} товару',
    },
    'favorites.empty': 'В обраному поки немає товарів',
    'favorites.noMatches': 'Товарів за вашим запитом не знайдено',
    'footer.github': 'GitHub',
    'footer.contacts': 'Контакти',
    'footer.rights': 'Правова інформація',
    'footer.backToTop': 'Нагору',
    'footer.navigation': 'Навігація в нижній частині сторінки',
    'notFound.title': 'Сторінку не знайдено',
    'notFound.home': 'Перейти на головну сторінку',
    'breadcrumb.label': 'Навігаційний ланцюжок',
    'pagination.label': 'Сторінки каталогу',
    'pagination.previous': 'Попередня сторінка',
    'pagination.next': 'Наступна сторінка',
    'slider.previous': 'Показати попередні товари',
    'slider.next': 'Показати наступні товари',
    'pictures.previous': 'Попередній слайд',
    'pictures.next': 'Наступний слайд',
    'pictures.banner': 'Рекламний банер',
    'pictures.goTo': 'Перейти до слайда {number}',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];
type TranslationParams = Record<string, string | number>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
}

const STORAGE_KEY = 'catalog-language';
const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const getInitialLanguage = (): Language => {
  try {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);

    if (storedLanguage === 'en' || storedLanguage === 'uk') {
      return storedLanguage;
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  return 'en';
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selected language still works for the current session.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(currentLanguage => (currentLanguage === 'en' ? 'uk' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKey, params: TranslationParams = {}) => {
      const translation = translations[language][key] as
        | string
        | Record<string, string>;
      const pluralRule = new Intl.PluralRules(
        language === 'uk' ? 'uk-UA' : 'en-US',
      ).select(Number(params.count ?? 0));
      const template =
        typeof translation === 'string'
          ? translation
          : (translation[pluralRule] ?? translation.other);

      return Object.entries(params).reduce<string>(
        (result, [name, value]) => result.replace(`{${name}}`, String(value)),
        template,
      );
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, t, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
};
