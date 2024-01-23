import React from 'react';
import './ProductDetailsComponent.scss';
import { ProductDetails } from '../../../definitions/types/ProductDetails';

interface Props {
  product: ProductDetails | null,
  loading: boolean,
}

export const ProductDetailsComponent: React.FC<Props> = ({ product, loading }) => {
  const BASE_CLASS = 'product-details';

  console.log(product, loading);

  return (
    <section className={BASE_CLASS}>
      <h1 className={`${BASE_CLASS}__title`}>
        {product?.name}
      </h1>

      <div className={`${BASE_CLASS}__content`}>
        <div className={`${BASE_CLASS}__left`}>

        </div>

        <div className={`${BASE_CLASS}__right`}>

        </div>
      </div>
    </section>
  );
};
