import { Status, useGlobalData } from '@features/index';
import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect, useState } from 'react';

export const useFavouritePage = () => {
  const { itemsInFav, favAmount } = useGlobalData();
  const [renderList, setRenderList] = useState<Product[] | Status>(
    Status.LOADING,
  );

  const load = async () => {
    try {
      const promises = itemsInFav.map(el => get.product(el.id));
      const products = await Promise.all(promises);
      const valid = products.filter(el => el !== Status.ERROR);

      setRenderList(valid as Product[]);
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    load();
  }, [itemsInFav]);

  return { renderList, favAmount };
};
