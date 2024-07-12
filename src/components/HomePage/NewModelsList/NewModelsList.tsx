import './NewModelsList.scss';
import React from 'react';
import products from '../../../api/products.json';
import { ProductsList } from '../../ProductsList/ProductsList';

export const NewModelsList = () => {
  const productsToRender = products
    .filter(product => product.year === 2022)
    .sort((a, b) => b.capacity.localeCompare(a.capacity));

  return (
    <ProductsList
      isDiscount={false}
      header="Brand new Models"
      productsToRender={productsToRender}
    />
  );
};
