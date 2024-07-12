import React from 'react';
import products from '../../../api/products.json';
import { ProductsList } from '../../ProductsList/ProductsList';

export const HotPricesList = () => {
  const productsToRender = products.filter(a => a.fullPrice - a.price >= 100);

  return (
    <ProductsList
      header="Hot prices"
      productsToRender={productsToRender}
      isDiscount={true}
    />
  );
};
