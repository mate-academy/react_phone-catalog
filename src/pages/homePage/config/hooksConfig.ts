import { Order, get } from '@shared/api/';

const CATALOGUE_CONFIGS = {
  NEWEST: {
    sortOrder: Order.AGE,
  },
  HOT_PRICE: {
    sortOrder: Order.FULL_PRICE_DECS_PROMO,
  },
} as const;

const DATA_LOAD_CONFIGS = {
  NEWEST: {
    key: 'newest',
    getter: () => get.catalogue(CATALOGUE_CONFIGS.NEWEST),
  },
  HOT_PRICE: {
    key: 'hotPrice',
    getter: () => get.catalogue(CATALOGUE_CONFIGS.HOT_PRICE),
  },
} as const;

export { DATA_LOAD_CONFIGS };
