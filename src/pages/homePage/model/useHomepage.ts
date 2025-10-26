import {
  CatalogueData,
  Category,
  get,
  ItemsAmount,
  LoadStatus,
  Order,
  useLoadItems,
} from '@shared/api/';
import { useCallback, useEffect } from 'react';

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

  const processNew = (): CatalogueData | LoadStatus => {
    if (typeof products.new.items === 'string') {
      return products.new.items;
    }

    const newArr = products.new.items.items;

    const newData = {
      items: newArr.map(el => ({ ...el, priceRegular: el.priceDiscount })),
      currentPage: products.new.items.currentPage,
      pages: products.new.items.pages,
    };

    return newData as CatalogueData;
  };

  return {
    amount,
    newItems: processNew(),
    promoItems: products.promo.items,
    banners: banners.items,
  };
};
