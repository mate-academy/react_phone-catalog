/* eslint-disable max-len */
import s from './HotPricesBlock.module.scss';

import { useMemo } from 'react';
import { Product } from '../../../../utils/types/Product';
import { ProductsSlider } from '../../../shared/ProductsSlider';
import { useProducts } from '../../../../context/products/useProducts';
/* eslint-enable max-len */

export const HotPricesBlock = () => {
  const { products } = useProducts();
  const title = 'Hot prices';
  const discountedProducts = useMemo(
    () =>
      products
        .sort((a, b) => b.fullPrice - a.fullPrice)
        .slice(0, 10) as Product[],
    [products],
  );

  return (
    <section className={s.section} aria-labelledby="hot-prices">
      <ProductsSlider products={discountedProducts} title={title} />
    </section>
  );
};
