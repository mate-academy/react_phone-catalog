import React, { useMemo } from 'react';
import { useProductsList } from '../_hooks/useProductsList';

export const ProductsAmount = ({ title }: ProductsAmountProps) => {
  const { phones, tablets, queryCondition } = useProductsList();
  const preparedTitle = title.toLowerCase();

  const amount = useMemo(() => {
    switch (true) {
      case preparedTitle.includes('phones'):
        return phones.length;
      case preparedTitle.includes('tablets'):
        return tablets.length;
      default:
        return 0;
    }
  }, [phones, tablets, preparedTitle]);

  return (
    <p className="products-amount categories__amount">
      {amount}
      {' '}
      {queryCondition()}
      {amount !== 1 && 's'}
    </p>
  );
};
