import React, { useMemo } from 'react';
import { useProductsList } from '../_hooks/useProductsList';

export const ProductsAmount = ({ title }: ProductsAmountProps) => {
  const { phones, tablets, queryCondition } = useProductsList();
  const preparedTitle = title.toLowerCase();

  const [amount = 0] = useMemo(() => {
    if (preparedTitle.includes('phones')) {
      return [phones.length];
    }

    return [tablets.length];
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
