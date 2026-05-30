/* eslint-disable max-len */
import s from './BrandNewBlock.module.scss';

import { useMemo } from 'react';
import { ProductsSlider } from '../../../shared/ProductsSlider';
import { useProducts } from '../../../../context/products/useProducts';
/* eslint-enable max-len */

export const BrandNewBlock = () => {
  const { products } = useProducts();
  const brandNewModels = useMemo(
    () => products.sort((a, b) => b.year - a.year).slice(0, 13),
    [products],
  );
  const title = 'Brand new models';

  return (
    <section className={s.section} aria-labelledby="new-models">
      <ProductsSlider products={brandNewModels} title={title} />
    </section>
  );
};
