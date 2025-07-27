export interface ProductDetailsDictionary {
  back: string;
  availableColors: string;
  selectCapacity: string;
  youMayAlsoLike: string;
  about: string;
  aboutFallback: string;
  productNotFound: string;
  somethingWentWrong: string;
  techSpecs: string;
  screen: string;
  resolution: string;
  processor: string;
  builtInMemory: string;
  camera: string;
  zoom: string;
  cell: string;
}

export const productDetailsDictionary: Record<
  'en' | 'ua',
  ProductDetailsDictionary
> = {
  en: {
    back: 'Back',
    availableColors: 'Available colors',
    selectCapacity: 'Select capacity',
    youMayAlsoLike: 'You may also like',
    about: 'About',
    aboutFallback:
      'Detailed information about this product is not available at the moment.',
    productNotFound: 'Product was not found',
    somethingWentWrong: 'Something went wrong!',
    techSpecs: 'Tech specs',
    screen: 'Screen',
    resolution: 'Resolution',
    processor: 'Processor',
    builtInMemory: 'Built in memory',
    camera: 'Camera',
    zoom: 'Zoom',
    cell: 'Cell',
  },

  ua: {
    back: 'Назад',
    availableColors: 'Доступні кольори',
    selectCapacity: 'Виберіть обсяг пам’яті',
    youMayAlsoLike: 'Вам також може сподобатися',
    about: 'Про продукт',
    aboutFallback: 'Детальна інформація про цей продукт наразі недоступна.',
    productNotFound: 'Товар не знайдено',
    somethingWentWrong: 'Щось пішло не так!',
    techSpecs: 'Технічні характеристики',
    screen: 'Дисплей',
    resolution: 'Роздільна здатність',
    processor: 'Процесор',
    builtInMemory: 'Вбудована пам’ять',
    camera: 'Камера',
    zoom: 'Зум',
    cell: 'Мобільні мережі',
  },
};
