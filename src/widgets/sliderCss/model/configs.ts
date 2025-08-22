import { SliderMode } from './types';
import {
  CatalogueSlider,
  CatalogueSkeleton,
  HeroSkeleton,
  HeroSlider,
  ProdSlider,
  ProdSkeleton,
} from '../ui';

const hero = {
  element: HeroSlider,
  skeleton: HeroSkeleton,
  err: 'Unable to load banners',
  contextConfig: {
    startIndex: 1,
    gap: 10,
  },
};

const catalogue = {
  element: CatalogueSlider,
  skeleton: CatalogueSkeleton,
  err: 'Unable to load catalogue slider',
  contextConfig: {
    startIndex: 0,
    gap: 16,
  },
};

const product = {
  element: ProdSlider,
  skeleton: ProdSkeleton,
  err: 'Unable to load product images',
  contextConfig: {
    startIndex: 1,
    gap: 10,
  },
};

const configs = {
  [SliderMode.HERO]: hero,
  [SliderMode.CATALOGUE]: catalogue,
  [SliderMode.PRODUCT_CARD]: product,
};

export { configs };
