import { HooksConfig, Mode, SliderConfig } from '../types/types';

const bannerHooksConfig: HooksConfig = {
  swipeCoeff: 1.2,
  threshold: 0.1,
  autoplay: {
    autoplay: true,
    times: Infinity,
    interval: 5000,
  },
  gap: 0,
  animationSpeed: 350,
};

const bannerConfig: SliderConfig = {
  mode: Mode.INFINITE,
  ...bannerHooksConfig,
};

const prodHooksConfig: HooksConfig = {
  swipeCoeff: 1.2,
  threshold: 0.1,
  autoplay: {
    autoplay: false,
  },
  gap: 16,
  animationSpeed: 350,
};

const prodConfig: SliderConfig = {
  mode: Mode.CLAMP,
  ...prodHooksConfig,
};

export { bannerConfig, prodConfig, prodHooksConfig, bannerHooksConfig };
