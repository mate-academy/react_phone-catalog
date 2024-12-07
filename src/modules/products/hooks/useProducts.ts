import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { getProducts, Meta } from '@shared/services/api';
import { ItemsOnPage, PaginationPage, SortBy } from '@shared/types/common';
import { ProductModel } from '@shared/types/Product';
import { ProductCategory } from '@shared/types/Product/Product.interfaces';
import {
  DEFAULT_ITEMS_ON_PAGE_VALUE,
  DEFAULT_PAGE_VALUE,
  DEFAULT_SORT_BY_VALUE,
} from '@shared/utils/constants';

export const useProducts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<{
    meta: Meta;
    data: ProductModel[];
  } | null>(null);

  const { category, itemsOnPage, sortBy, page } = useMemo(
    () => ({
      category: searchParams.get('category') as ProductCategory,
      sortBy: (searchParams.get('sort_by') || DEFAULT_SORT_BY_VALUE) as SortBy,
      itemsOnPage: (searchParams.get('items_on_page') ||
        DEFAULT_ITEMS_ON_PAGE_VALUE) as ItemsOnPage,
      page: (searchParams.get('page') || DEFAULT_PAGE_VALUE) as PaginationPage,
    }),
    [searchParams],
  );

  useEffect(() => {
    if (category) {
      setIsLoading(true);

      getProducts({ category, sortBy, itemsOnPage, page })
        .then(response => {
          setProducts(response);
          setIsLoading(false);
        })
        .catch(() => {
          navigate('/error');
        });
    }
  }, [category, sortBy, itemsOnPage, page, navigate]);

  return {
    isLoading,
    products,
    category,
    itemsOnPage,
  };
};
