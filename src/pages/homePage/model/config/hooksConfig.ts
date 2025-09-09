import { Order, get } from '@shared/api/';

const DATA_LOAD = {
  NEW: () => get.catalogue({ sort: Order.AGE }),
  HOT: () => get.catalogue({ sort: Order.FULL_PRICE_DECS_PROMO }),
} as const;

export { DATA_LOAD };
