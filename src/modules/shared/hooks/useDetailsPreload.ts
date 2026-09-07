import { useCallback, useEffect } from 'react';

import { loadPhones } from '@features/phonesSlice';
import { loadTablets } from '@features/tabletsSlice';
import { loadAccessories } from '@features/accessoriesSlice';

import { ProductCategory } from '@sTypes/ProductCategory';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export const useDetailsPreload = (category: ProductCategory) => {
  const dispatch = useAppDispatch();

  const { productsDetails, isLoading, isLoaded, error } = useAppSelector(
    state => state[category as ProductCategory],
  );

  const loadData = useCallback(() => {
    switch (category) {
      case ProductCategory.phones:
        dispatch(loadPhones());
        break;

      case ProductCategory.tablets:
        dispatch(loadTablets());
        break;

      case ProductCategory.accessories:
        dispatch(loadAccessories());
        break;
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (isLoaded || productsDetails.length) {
      return;
    }

    if (isLoading) {
      return;
    }

    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const reload = useCallback(() => loadData(), [loadData]);

  return {
    productsDetails,
    isLoading,
    isLoaded,
    error,
    reload,
  };
};
