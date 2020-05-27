
import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../interfaces';
import './PhonesPage.scss';
import { Breadcrumbs} from '../../components/Breadcrumbs/Breadcrumbs';
import { WaitLoading } from '../../components/WaitLoading/WaitLoading';

export const PhonesPage = ({ products }: {products: Product[]}) => {



  const visibleProducts = products.filter(product => product.type === 'phone');
  return (
    (JSON.stringify(products) === JSON.stringify({}))
    ? <WaitLoading />
    :
    <div className="PhonesPage">
      <Breadcrumbs />
      <h1 className="PhonesPage__h1">Mobile phones</h1>
      <Catalog
        products={visibleProducts}
      />
    </div>
  )
}
