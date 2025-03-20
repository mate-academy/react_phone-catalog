import React from 'react';
import { ProductCatalog } from '../ProductCatalog';
import products from '../../../public/api/products.json';
import { Product } from '../types/Product';

function getAccessories(p: Product[]) {
  const accessories = p.filter(product => {
    return product.category === 'accessories';
  });

  return accessories;
}

export const AccessoriesPage = () => {
  return (
    <ProductCatalog title={'Accessories'} products={getAccessories(products)} />
  );
};
