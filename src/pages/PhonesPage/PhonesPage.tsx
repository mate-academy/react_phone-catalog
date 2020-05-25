
import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../interfaces';
import './PhonesPage.scss';


export const PhonesPage = ({ products }: {products: Product[]}) => {



  const visibleProducts = products.filter(product => product.type === 'phone');
  return (
    <div className="PhonesPage">
      <h1 className="PhonesPage__h1">Mobile phones</h1>
      <Catalog
        products={visibleProducts}
      />
    </div>
  )
}
