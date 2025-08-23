import { SliderMode } from './types';
import {
  CatalogueSlider,
  CatalogueSkeleton,
  HeroSkeleton,
  HeroSlider,
  ProdSlider,
  ProdSkeleton,
} from '../ui';

const defaultConf = {
  gap: 16,
  animationSpeed: 300,
  startIndex: 1,
};

const visualConfig = {
  gap: 16,
  animationSpeed: 300,
};

const hero = {
  element: HeroSlider,
  skeleton: HeroSkeleton,
  err: 'Unable to load banners',
  props: defaultConf,
};

const catalogue = {
  element: CatalogueSlider,
  skeleton: CatalogueSkeleton,
  err: 'Unable to load catalogue slider',
  props: {
    ...defaultConf,
    startIndex: 0,
  },
};

const product = {
  element: ProdSlider,
  skeleton: ProdSkeleton,
  err: 'Unable to load product images',
  props: defaultConf,
};

const configs = {
  [SliderMode.HERO]: hero,
  [SliderMode.CATALOGUE]: catalogue,
  [SliderMode.PRODUCT_CARD]: product,
};

export { configs, visualConfig };
