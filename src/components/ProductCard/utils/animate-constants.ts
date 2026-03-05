import type { RefObject } from 'react';

export type AnimationType = 'book' | 'heart';

export interface AnimateToTargetParams {
  sourceEl: HTMLElement | null | undefined;
  targetRef?: RefObject<HTMLElement | null>;
  type?: AnimationType;
}

export const ANIM_SETTINGS = {
  duration: 1.2,
  appearanceDuration: 0.1,
  bounceDuration: 0.2,

  scale: 1.1,
  rotations: { book: 360, heart: 45 },

  blurAmount: 10,
  opacityEnd: 0,

  sizes: {
    book: 40,
    heart: 32,
  },

  mobileTarget: {
    xOffset: 40,
    yOffset: 40,
  },

  colors: {
    book: '#e3a651',
    heart: '#ff4d4d',
  },
} as const;

export const getAnimationSVG = (
  type: 'book' | 'heart',
  size: number,
  color: string,
) => {
  const svgs = {
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M8 7h6" /><path d="M8 11h8" /></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>`,
  };
  return svgs[type];
};
