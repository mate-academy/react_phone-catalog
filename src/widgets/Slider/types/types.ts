enum SliderType {
  PROD = 'prod',
  BANNER = 'banner',
}

enum Mode {
  CLAMP = 'clamp',
  INFINITE = 'infinite',
}

type AutoplayParams = {
  autoplay: boolean;
  times?: number;
  interval?: number;
};

interface SliderConfig {
  mode: Mode;
  swipeCoeff: number;
  threshold: number;
  autoplay: AutoplayParams;
  gap: number;
  animationSpeed: number;
}

interface HooksConfig extends Omit<SliderConfig, 'mode'> {}

export {
  SliderType,
  Mode,
  type AutoplayParams,
  type SliderConfig,
  type HooksConfig,
};
