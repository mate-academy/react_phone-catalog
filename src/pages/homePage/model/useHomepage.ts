import { Category, get, ItemsAmount, Order } from '@shared/api/';
import { useCallback, useEffect } from 'react';
import { Status, useLoadItems } from '@features/index';
import { CatalogueData } from '@shared/api/types';
import { BannerData } from '@shared/types';

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

export const useHomePage = () => {
  const products = {
    new: useLoadItems(DATA_LOAD.NEW),
    promo: useLoadItems(DATA_LOAD.HOT),
  };

  const banners = useLoadItems(() => get.banners());

  const amount = {
    phones: useLoadItems(() => get.length(Category.PHONES)),
    tablets: useLoadItems(() => get.length(Category.TABLETS)),
    accessories: useLoadItems(() => get.length(Category.ACCESSORIES)),
  };

  const loadAllData = useCallback(async () => {
    await Promise.all([
      products.new.loadItems(),
      products.promo.loadItems(),
      banners.loadItems(),
      amount.phones.loadItems(),
      amount.tablets.loadItems(),
      amount.accessories.loadItems(),
    ]);
  }, []);

  useEffect(() => {
    loadAllData();
  }, []);

  return {
    amount,
    newItems: products.new.items as CatalogueData | Status,
    promoItems: products.promo.items as CatalogueData | Status,
    banners: banners.items as BannerData[] | Status,
  };
};
