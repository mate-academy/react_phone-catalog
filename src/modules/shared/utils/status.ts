export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  NOT_FOUND_PRODUCT: 'not-found-product',
  NOT_FOUND_PAGE: 'not-found-page',
  ERROR: 'error',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
