type AutoplayParams = {
  autoplay: boolean;
  times?: number;
  interval?: number;
};

const enum Mode {
  CLAMP = 'clamp',
  INFINITE = 'infinite',
}

type SliderConfig = {
  mode: Mode;
  swipeCoeff?: number;
  threshold?: number;
  autoplay?: AutoplayParams;
  gap?: number;
  animationSpeed?: number;
};

const defaultConfig: SliderConfig = {
  mode: Mode.CLAMP,
  swipeCoeff: 1.2,
  threshold: 0.1,
  autoplay: {
    autoplay: false,
    times: 0,
    interval: 0,
  },
  gap: 0,
  animationSpeed: 350,
};

export { defaultConfig, type SliderConfig, type AutoplayParams, Mode };
