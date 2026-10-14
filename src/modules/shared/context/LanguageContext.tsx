import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

export type Language = 'en' | 'ua';

const translations = {
  en: {
    home: 'Home',
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favorites: 'Favorites',
    cart: 'Cart',
    searchPlaceholder: 'Search in',
    hotPrices: 'Hot prices',
    brandNew: 'Brand new',
    shopByCategory: 'Shop by category',
    mobilePhones: 'Mobile phones',
    models: 'models',
    modelsCount: 'models',
    items: 'items',
    sortBy: 'Sort by',
    itemsOnPage: 'Items on page',
    newest: 'Newest',
    alphabetically: 'Alphabetically',
    cheapest: 'Cheapest',
    all: 'All',
    addToCart: 'Add to cart',
    addedToCart: 'Added to cart',
    back: 'Back',
    about: 'About',
    techSpecs: 'Tech specs',
    screen: 'Screen',
    resolution: 'Resolution',
    processor: 'Processor',
    ram: 'RAM',
    builtinMemory: 'Built in memory',
    camera: 'Camera',
    zoom: 'Zoom',
    cell: 'Cell',
    capacity: 'Capacity',
    availableColors: 'Available colors',
    selectCapacity: 'Select capacity',
    youMayAlsoLike: 'You may also like',
    totalForItems: 'Total for {count} items',
    checkout: 'Checkout',
    checkoutModal:
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    confirm: 'Confirm',
    cancel: 'Cancel',
    cartEmpty: 'Your cart is empty',
    productNotFound: 'Product was not found',
    pageNotFound: 'Page not found',
    backToHome: 'Back to Home',
    backToTop: 'Back to top',
    githubRepo: 'Github',
    contacts: 'Contacts',
    rights: 'Rights',
    somethingWentWrong: 'Something went wrong',
    reload: 'Reload',
    noProductsYet: 'There are no {category} yet',
    noMatchingProducts: 'There are no {category} matching the query',
  },
  ua: {
    home: 'Головна',
    phones: 'Телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
    favorites: 'Обране',
    cart: 'Кошик',
    searchPlaceholder: 'Пошук серед',
    hotPrices: 'Гарячі ціни',
    brandNew: 'Новинки',
    shopByCategory: 'Категорії',
    mobilePhones: 'Мобільні телефони',
    models: 'моделей',
    modelsCount: 'моделей',
    items: 'товарів',
    sortBy: 'Сортувати за',
    itemsOnPage: 'Товарів на сторінці',
    newest: 'Найновіші',
    alphabetically: 'За алфавітом',
    cheapest: 'Найдешевші',
    all: 'Всі',
    addToCart: 'До кошика',
    addedToCart: 'Додано',
    back: 'Назад',
    about: 'Про товар',
    techSpecs: 'Характеристики',
    screen: 'Екран',
    resolution: 'Роздільна здатність',
    processor: 'Процесор',
    ram: 'Оперативна памʼять',
    builtinMemory: 'Вбудована памʼять',
    camera: 'Камера',
    zoom: 'Зум',
    cell: 'Звʼязок',
    capacity: 'Ємність',
    availableColors: 'Доступні кольори',
    selectCapacity: 'Оберіть ємність',
    youMayAlsoLike: 'Вам також може сподобатися',
    totalForItems: 'Разом за {count} товар(ів)',
    checkout: 'Оформити замовлення',
    checkoutModal:
      'Оформлення замовлення ще не реалізовано. Бажаєте очистити кошик?',
    confirm: 'Підтвердити',
    cancel: 'Скасувати',
    cartEmpty: 'Ваш кошик порожній',
    productNotFound: 'Товар не знайдено',
    pageNotFound: 'Сторінку не знайдено',
    backToHome: 'На головну',
    backToTop: 'Догори',
    githubRepo: 'Github',
    contacts: 'Контакти',
    rights: 'Права',
    somethingWentWrong: 'Щось пішло не так',
    reload: 'Перезавантажити',
    noProductsYet: 'У категорії {category} ще немає товарів',
    noMatchingProducts: 'Немає {category}, що відповідають запиту',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (
    key: keyof (typeof translations)['en'],
    params?: Record<string, string | number>,
  ) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('phone-catalog-lang') as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('phone-catalog-lang', lang);
  };

  const t = useCallback(
    (
      key: keyof (typeof translations)['en'],
      params?: Record<string, string | number>,
    ): string => {
      let text = translations[language][key] || translations.en[key] || key;

      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(`{${paramKey}}`, String(paramValue));
        });
      }

      return text;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return ctx;
};
