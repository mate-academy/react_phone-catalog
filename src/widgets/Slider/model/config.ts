import banner from '../styles/bannerSlider.module.scss';
import prod from '../styles/productSlider.module.scss';
import cat from '../styles/catalogueSlider.module.scss';

interface SliderConfig {
  buttons: boolean;
  autoplay: boolean;
  styles: {
    container: string;
    viewport: string;
    track: string;
    button?: string;
  };
  gap: number;
  animationSpeed: number;
}

const productConfig: SliderConfig = {
  buttons: false,
  autoplay: false,
  styles: {
    container: prod['product-slider'],
    viewport: prod.viewport,
    track: prod.track,
  },
  gap: 16,
  animationSpeed: 300,
};

const bannerConfig: SliderConfig = {
  buttons: true,
  autoplay: true,
  styles: {
    container: banner['hero-slider'],
    viewport: banner.viewport,
    track: banner.track,
    button: banner.button,
  },
  gap: 16,
  animationSpeed: 300,
};

const catalogueConfig = {
  styles: {
    container: cat['catalogue-slider'],
    viewport: cat.viewport,
    track: cat.track,
    title: cat.title,
  },
  gap: 16,
  animationSpeed: 300,
};

const config: Record<number, SliderConfig> = {
  0: productConfig,
  1: bannerConfig,
};

export { config, type SliderConfig, catalogueConfig };
