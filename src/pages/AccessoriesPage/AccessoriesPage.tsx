import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../interfaces';
import './AccessoriesPage.scss';

export const AccessoriesPage = ({ products }: {products: Product[]}) => {
  const visibleProducts = products
    .filter(product => product.type === 'accessorie' || !product.type);
  return (
    <div className="AccessoriesPage">
      <h1 className="Accessories__h1">Accessories</h1>
      <Catalog
        products={visibleProducts}
      />
    </div>
  )
}
