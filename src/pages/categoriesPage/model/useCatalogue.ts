import { useSearchParams } from 'react-router-dom';
import { argToValidAmount, argToValidSort } from '.';
import { Category, get, ItemsAmount, Order } from '@shared/api';
import { useEffect, useRef, useState } from 'react';
import { CatalogueProduct } from '@shared/types';

export const useCatalogue = (category: Category) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<CatalogueProduct[] | null | undefined>(
    null,
  );
  const pages = useRef<number>(1);
  const currentPage = useRef<number>(1);
  const failCount = useRef<number>(0);
  const [tick, render] = useState(false);
  const rerender = () => render(!tick);

  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '';
  const perPage = searchParams.get('perPage') || '';

  const apiConf = {
    itemType: category,
    sortOrder: argToValidSort[sort] || Order.NONE,
    itemsOnPage: argToValidAmount[perPage] || ItemsAmount.ALL,
    page: +page || 1,
  };

  const loadCatalogue = async () => {
    try {
      const res = await get.catalogue(apiConf);

      pages.current = res.pages;
      currentPage.current = res.currentPage;
      setItems(res.data);
    } catch (e) {
      if (failCount.current < 3) {
        failCount.current += 1;
        await new Promise(resolve =>
          setTimeout(resolve, 1000 * failCount.current),
        );

        return loadCatalogue();
      } else {
        setItems(undefined);
      }
    }
  };

  useEffect(() => {
    loadCatalogue();
  }, [sort, page, perPage]);

  type SetOfSort = {
    param: 'sort';
    value: Omit<Order, Order.FULL_PRICE_DECS_PROMO>;
  };

  type SetOfPerPage = {
    param: 'perPage';
    value: ItemsAmount;
  };

  type SetOfPage = {
    param: 'page';
    value: string;
  };

  type FnParams = SetOfSort | SetOfPerPage | SetOfPage;

  const setFilter = ({ params }: { params: FnParams }) => {
    const { param, value } = params;

    setSearchParams(url => {
      {
        if (value === '' || value === ItemsAmount.ALL || value === '1') {
          url.delete(param);
        } else {
          url.set(param, value as string);
        }

        rerender();

        return url;
      }
    });
  };

  return { items, setFilter };
};
