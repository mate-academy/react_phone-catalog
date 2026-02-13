import { UILoadStatus, useGlobalData } from '@features/index';
import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect, useState } from 'react';

export const useFavouritePage = () => {
  const { itemsInFav, favAmount } = useGlobalData();
  const [renderList, setRenderList] = useState<Product[] | UILoadStatus>(
    UILoadStatus.LOADING,
  );

  const load = async () => {
    try {
      const promises = itemsInFav.map(el => get.product(el.id));
      const products = await Promise.all(promises);
      const valid = products.filter(el => el.ok);

      setRenderList(valid.map(el => el.data));
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    load();
  }, [itemsInFav]);

  return { renderList, favAmount };
};
