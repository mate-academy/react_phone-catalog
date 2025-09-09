import { Category, get } from '@shared/api/';
import { BannerData, CatalogueProduct } from '@shared/types/APIReturnTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DATA_LOAD } from './config';

type ItemState = {
  new: CatalogueProduct[] | null | undefined;
  promo: CatalogueProduct[] | null | undefined;
  banner: BannerData[] | null | undefined;
};

type FlagKey = 'new' | 'promo' | 'banner';

export const useHomePage = () => {
  const [items, setItems] = useState<ItemState>({
    new: null,
    promo: null,
    banner: null,
  });

  const [amount, setAmount] = useState({
    phones: 'Loading...',
    tablets: 'Loading...',
    accessories: 'Loading...',
  });

  const failCount = {
    new: useRef<number>(0),
    promo: useRef<number>(0),
    banner: useRef<number>(0),
  };

  // that func is universal loader for different datatypes and uses API config, that's why 'any'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const load = async (bar: any, flag: FlagKey) => {
    try {
      const foo = await bar();

      setItems(prev => ({ ...prev, [flag]: foo.data ? foo.data : foo }));

      failCount[flag].current = 0;
    } catch (e) {
      if (failCount[flag].current < 3) {
        failCount[flag].current += 1;
        await new Promise(resolve =>
          setTimeout(resolve, 1000 * failCount[flag].current),
        );

        return load(bar, flag);
      } else {
        setItems(prev => ({ ...prev, [flag]: undefined }));
      }
    }
  };

  const loadAllData = useCallback(async () => {
    await Promise.all([
      load(get.banners, 'banner'),
      load(DATA_LOAD.NEW, 'new'),
      load(DATA_LOAD.HOT, 'promo'),
    ]);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const loadAmount = async (category: Exclude<Category, Category.ALL>) => {
    try {
      const res = await get.length(category);

      setAmount(prev => ({
        ...prev,
        [category as string]: `${res.toString()} models`,
      }));
    } catch (e) {
      setAmount(prev => ({
        ...prev,
        [category as string]: 'failed to load data',
      }));
    }
  };

  useEffect(() => {
    Promise.all(
      Object.values(Category)
        .filter(cat => cat !== Category.ALL)
        .map(category => loadAmount(category)),
    );
  }, []);

  return { amount, items };
};
