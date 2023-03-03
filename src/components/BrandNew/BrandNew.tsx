import React from 'react';
import '../../pages/page.scss';
import './BrandNew.scss';

import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

type Props = {
  products: Product[],
};

export const BrandNew: React.FC<Props> = ({ products }) => {
  return (
    <section className="brand-new page__section">
      <h2 className="brand-new__title page__section-title">
        Brand new models
      </h2>

      <ProductsSlider products={products} />
    </section>
  );
};
