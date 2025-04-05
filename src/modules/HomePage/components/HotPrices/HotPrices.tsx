import React, { useMemo } from 'react';
import { ProductSlider } from '../../../../components/ProductSlider';
import hotPricesStyles from './HotPrices.module.scss';
import { Product } from '../../../../types/Product';
import { SectionTitle } from '../SectionTitle/SectionTitle';

type Props = {
  products: Product[];
};
export const HotPrices: React.FC<Props> = ({ products }) => {
  const visibleProducts = useMemo(
    () =>
      [...products].sort((product1, product2) => {
        const discountProduct1 = product1.fullPrice - product1.price;
        const discountProduct2 = product2.fullPrice - product2.price;

        return discountProduct2 - discountProduct1;
      }),
    [products],
  );

  return (
    <section className={hotPricesStyles.hotPrices}>
      <ProductSlider products={visibleProducts}>
        <SectionTitle title="Hot prices" />
      </ProductSlider>
    </section>
  );
};
