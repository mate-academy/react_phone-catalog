import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../interfaces';
import './TabletsPage.scss';

export const TabletsPage = ({ products }:{products: Product[]}) => {
  const visibleProducts = products.filter(product => product.type === 'tablet');
  return (
    <div className="TabletsPage">
      <h1 className="TabletsPage__h1">Tablets</h1>
      <Catalog
        products={visibleProducts}
      />
    </div>
  )
}
