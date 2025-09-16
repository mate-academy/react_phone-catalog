import { Order, get, Category, ItemsAmount } from '@shared/api/';

const DATA_LOAD = {
  NEW: () =>
    get.catalogue({
      itemType: Category.ALL,
      sort: Order.AGE,
      perPage: ItemsAmount.ALL,
      page: 1,
    }),
  HOT: () =>
    get.catalogue({
      itemType: Category.ALL,
      sort: Order.FULL_PRICE_DECS_PROMO,
      perPage: ItemsAmount.ALL,
      page: 1,
    }),
};

export { DATA_LOAD };
