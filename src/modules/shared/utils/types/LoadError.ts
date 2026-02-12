export const LOAD_ERROR = {
  noProducts: 'no Products',
  couldntload: 'couldnt load',
  noError: 'no error',
} as const;

export type LoadError = (typeof LOAD_ERROR)[keyof typeof LOAD_ERROR];
