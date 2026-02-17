type HeaderNames = {
  main: string;
  phones: string;
  tablets: string;
  accessories: string;
};

interface HeaderTranslations {
  ua: HeaderNames;
  en: HeaderNames;
}

export const headerDictionary: HeaderTranslations = {
  en: {
    main: `Home`,
    phones: `Phones`,
    tablets: `Tablets`,
    accessories: `Accessories`,
  },
  ua: {
    main: `Головна`,
    phones: `Телефони`,
    tablets: `Планшети`,
    accessories: `Аксесуари`,
  },
};
