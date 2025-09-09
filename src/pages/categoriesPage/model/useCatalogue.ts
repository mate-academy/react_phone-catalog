import { Category, get } from '@shared/api';
import { useEffect, useRef, useState } from 'react';
import { CatalogueProduct } from '@shared/types';
import { useUrlReducer } from './useUrlReducer';
import { CatalogueConf, ItemsAmount, Order } from '@shared/api/typesAndEnums';

type Props = {
  category: Exclude<Category, Category.ALL>;
};

export const useCatalogue = ({ category }: Props) => {
  const [data, setData] = useState<{
    items: CatalogueProduct[] | null | undefined;
    length: string;
  }>({
    items: null,
    length: 'Loading...',
  });
  const pages = useRef<number>(1);
  const currentPage = useRef<number>(1);
  const failCount = useRef<number>(0);

  const [state, dispatch] = useUrlReducer();

  const apiConfig: CatalogueConf = {
    itemType: category,
    sort: state.sort || Order.NONE,
    perPage: state.perPage || ItemsAmount.ALL,
    page: +state.page || 1,
  };

  const loadCatalogue = async () => {
    try {
      const res = await get.catalogue(apiConfig);
      const length = await get.length(category);

      pages.current = res.pages;
      currentPage.current = res.currentPage;
      failCount.current = 0;

      setData({ items: res.data, length: `${length} models` });
    } catch (e) {
      if (failCount.current < 3) {
        failCount.current += 1;
        await new Promise(resolve =>
          setTimeout(resolve, 1000 * failCount.current),
        );

        return loadCatalogue();
      } else {
        setData({ items: undefined, length: '0' });
      }
    }
  };

  useEffect(() => {
    loadCatalogue();
  }, [category, state]);

  const set = {
    order: (order: Order) => dispatch({ type: 'SET_SORT', payload: order }),
    amount: (amount: ItemsAmount) =>
      dispatch({ type: 'SET_PER_PAGE', payload: amount }),
    page: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
  };

  return {
    data,
    currentPage,
    pages,
    set,
    currentOrder: apiConfig.sort as string,
    currentPerPage: apiConfig.perPage as string,
  };
};
