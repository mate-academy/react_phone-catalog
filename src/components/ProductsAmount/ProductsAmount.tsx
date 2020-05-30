import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useProductsList } from '../_hooks/useProductsList';
import { getFavorites } from '../../redux';
import { PRODUCT_PATHS } from '../../common/constants';

export const ProductsAmount = ({ title }: ProductsAmountProps) => {
  const { phones, tablets, queryCondition } = useProductsList();
  const favorites: Product[] = useSelector(getFavorites);
  const preparedTitle = title.toLowerCase();

  const amount = useMemo(() => {
    switch (true) {
      case preparedTitle.includes(PRODUCT_PATHS.phone):
        return phones.length;
      case preparedTitle.includes(PRODUCT_PATHS.tablet):
        return tablets.length;
      case preparedTitle.includes(PRODUCT_PATHS.favorites):
        return favorites.length;
      default:
        return 0;
    }
  }, [phones, tablets, favorites, preparedTitle]);

  return (
    <p className="products-amount categories__amount">
      {amount}
      {' '}
      {queryCondition()}
      {amount !== 1 && 's'}
    </p>
  );
};
