import { AutoplayParams } from '../model/defaultConfig';

export type HooksConfig = {
  swipeCoeff: number;
  threshold: number;
  autoplay: AutoplayParams;
};

export type VisualConfig = {
  gap: number;
  animationSpeed: number;
};

export enum SliderType {
  PROD = 'prod',
  BANNER = 'banner',
}
