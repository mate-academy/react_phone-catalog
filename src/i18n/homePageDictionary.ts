type HomePageTexts = {
  welcomeTitle: string;
  brandNewModels: string;
  hotPrices: string;
};

interface HomePageTranslations {
  en: HomePageTexts;
  ua: HomePageTexts;
}

export const homePageDictionary: HomePageTranslations = {
  en: {
    welcomeTitle: 'Welcome to Nice Gadgets store!',
    brandNewModels: 'Brand new models',
    hotPrices: 'Hot prices',
  },
  ua: {
    welcomeTitle: 'Ласкаво просимо до магазину Nice Gadgets!',
    brandNewModels: 'Нові моделі',
    hotPrices: 'Гарячі ціни',
  },
};
