import { Order, get } from '@shared/api/';

const DATA_LOAD = {
  NEW: () => get.catalogue({ sortOrder: Order.AGE }),
  HOT: () => get.catalogue({ sortOrder: Order.FULL_PRICE_DECS_PROMO }),
} as const;

export { DATA_LOAD };
