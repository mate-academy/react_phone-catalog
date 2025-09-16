import { Category, get } from '@shared/api/';
import { useCallback, useEffect } from 'react';
import { DATA_LOAD } from './config';
import { useLoadItems } from '@features/index';

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
    newItems: products.new.items,
    promoItems: products.promo.items,
    banners: banners.items,
  };
};
