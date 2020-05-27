import React from 'react';
import { useProductsList } from '../_hooks/useProductsList';

export const ProductsAmount = ({ title }: ProductsAmountProps) => {
  const { phones, tablets, queryCondition } = useProductsList();
  let amount = 0;

  const preparedTitle = title.toLowerCase();

  if (preparedTitle.includes('phones')) {
    amount = phones.length;
  }

  if (preparedTitle.includes('tablets')) {
    amount = tablets.length;
  }

  return (
    <p className="products-amount categories__amount">
      {amount}
      {' '}
      {queryCondition()}
      {amount !== 1 && 's'}
    </p>
  );
};
