import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";
export type Language = "en" | "ua";

type Labels = {
  navHome: string;
  navPhones: string;
  navTablets: string;
  navAccessories: string;
  searchPlaceholder: string;
  searchNoMatchProducts: string;
  searchNoMatchCategory: (category: string) => string;
  models: (count: number) => string;
  itemCount: (count: number) => string;
  sortBy: string;
  newest: string;
  alphabetically: string;
  cheapest: string;
  itemsOnPage: string;
  shopByCategory: string;
  mobilePhones: string;
  tablets: string;
  accessories: string;
  favorites: string;
  checkout: string;
  checkoutTitle: string;
  checkoutMessage: string;
  clearCart: string;
  keepItems: string;
  theme: string;
  language: string;
  welcome: string;
  brandNewModels: string;
  hotPrices: string;
};

const dictionaries: Record<Language, Labels> = {
  en: {
    navHome: "Home",
    navPhones: "Phones",
    navTablets: "Tablets",
    navAccessories: "Accessories",
    searchPlaceholder: "Search products...",
    searchNoMatchProducts: "There are no products matching the query",
    searchNoMatchCategory: category =>
      `There are no ${category} matching the query`,
    models: count => `${count} models`,
    itemCount: count => `${count} ${count === 1 ? "item" : "items"}`,
    sortBy: "Sort by",
    newest: "Newest",
    alphabetically: "Alphabetically",
    cheapest: "Cheapest",
    itemsOnPage: "Items on page",
    shopByCategory: "Shop by category",
    mobilePhones: "Mobile phones",
    tablets: "Tablets",
    accessories: "Accessories",
    favorites: "Favorites",
    checkout: "Checkout",
    checkoutTitle: "Checkout",
    checkoutMessage: "Checkout is not implemented yet. Clear your cart now?",
    clearCart: "Clear cart",
    keepItems: "Keep items",
    theme: "Theme",
    language: "Language",
    welcome: "Welcome to Nice Gadgets store!",
    brandNewModels: "Brand new models",
    hotPrices: "Hot prices",
  },
  ua: {
    navHome: "Головна",
    navPhones: "Телефони",
    navTablets: "Планшети",
    navAccessories: "Аксесуари",
    searchPlaceholder: "Пошук товарів...",
    searchNoMatchProducts: "Немає товарів за цим запитом",
    searchNoMatchCategory: category => `Немає ${category} за цим запитом`,
    models: count => `${count} моделей`,
    itemCount: count => `${count} ${count === 1 ? "товар" : "товарів"}`,
    sortBy: "Сортувати за",
    newest: "Новинки",
    alphabetically: "За алфавітом",
    cheapest: "Найдешевші",
    itemsOnPage: "На сторінці",
    shopByCategory: "Категорії",
    mobilePhones: "Мобільні телефони",
    tablets: "Планшети",
    accessories: "Аксесуари",
    favorites: "Обране",
    checkout: "Оформити",
    checkoutTitle: "Оформлення",
    checkoutMessage: "Оформлення ще не реалізовано. Очистити кошик?",
    clearCart: "Очистити",
    keepItems: "Залишити",
    theme: "Тема",
    language: "Мова",
    welcome: "Ласкаво просимо до магазину Nice Gadgets!",
    brandNewModels: "Нові моделі",
    hotPrices: "Гарячі ціни",
  },
};

interface SettingsContextType {
  theme: Theme;
  language: Language;
  labels: Labels;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const initialState: SettingsContextType = {
  theme: "dark",
  language: "en",
  labels: dictionaries.en,
  toggleTheme: () => undefined,
  toggleLanguage: () => undefined,
};

export const AppSettingsContext = React.createContext(initialState);

const THEME_KEY = "app_theme";
const LANG_KEY = "app_language";

const getTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_KEY);

  return saved === "light" ? "light" : "dark";
};

const getLanguage = (): Language => {
  const saved = localStorage.getItem(LANG_KEY);

  return saved === "ua" ? "ua" : "en";
};

export const AppSettingsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(getTheme);
  const [language, setLanguage] = useState<Language>(getLanguage);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      language,
      labels: dictionaries[language],
      toggleTheme: () => setTheme(prev => (prev === "dark" ? "light" : "dark")),
      toggleLanguage: () => setLanguage(prev => (prev === "en" ? "ua" : "en")),
    }),
    [theme, language],
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};
