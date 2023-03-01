import React from 'react';
import './BrandNew.scss';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[],
};

export const BrandNew: React.FC<Props> = ({ products }) => {
  return (
    <section className="brand-new">
      <h2 className="brand-new__title">
        Brand new models
      </h2>

      <div className="brand-new__content">
        <ProductsSlider products={products} />
      </div>
    </section>
  );
};
