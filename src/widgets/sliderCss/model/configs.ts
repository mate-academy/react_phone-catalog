import { SliderMode } from './types';
import { CatalogueSlider, HeroSlider, ProductSlider } from '../ui';

const hero = {
  element: HeroSlider,
  contextConfig: {
    startIndex: 0,
    gap: 10,
  },
};

const catalogue = {
  element: CatalogueSlider,
  contextConfig: {
    startIndex: 0,
    gap: 16,
  },
};

const product = {
  element: ProductSlider,
  contextConfig: {
    startIndex: 0,
    gap: 10,
  },
};

const configs = {
  [SliderMode.HERO]: hero,
  [SliderMode.CATALOGUE]: catalogue,
  [SliderMode.PRODUCT_CARD]: product,
};

export { configs };
