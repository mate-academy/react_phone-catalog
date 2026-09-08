import { useMemo } from 'react';

import styles from './HotPrices.module.scss';
import { useProducts } from '../../../shared/Utills/ProductContext';
import { ProductSlider } from '../../../shared/componets/ProductSlider';

export const HotPrices = () => {
  const { products } = useProducts();

  const title = 'Hot Price';

  const hotPrice = useMemo(() => {
    const list = products?.products ?? [];

    return [...list].sort((product1, product2) => {
      const discount1 = product1.fullPrice - product1.price;
      const discount2 = product2.fullPrice - product2.price;

      return discount2 - discount1;
    });
  }, [products]);

  return (
    <section className={styles.hot__prices}>
      <ProductSlider data={hotPrice} hasDiscount={true} title={title} />
    </section>
  );
};
