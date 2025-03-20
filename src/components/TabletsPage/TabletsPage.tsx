import React from 'react';
import { ProductCatalog } from '../ProductCatalog';
import products from '../../../public/api/products.json';
import { Product } from '../types/Product';

function getTablets(p: Product[]) {
  const phones = p.filter(product => {
    return product.category === 'tablets';
  });

  return phones;
}

export const TabletsPage = () => {
  return <ProductCatalog title={'Tablets'} products={getTablets(products)} />;
};
