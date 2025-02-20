import React from 'react';
import { ProductCatalog } from '../ProductCatalog';
import products from '../../../public/api/products.json';
import { Product } from '../types/Product';

function getPhones(p: Product[]) {
  const phones = p.filter(product => {
    return product.category === 'phones';
  });

  return phones;
}

export const PhonesPage = () => {
  return (
    <ProductCatalog title={'Mobile phones'} products={getPhones(products)} />
  );
};
