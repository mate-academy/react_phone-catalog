import { useMemo } from 'react';
import styles from './NewModelsSlider.module.scss';

import { useProducts } from '../../../shared/Utills/ProductContext';
import { ProductSlider } from '../../../shared/componets/ProductSlider';

export const NewModelsSlider = () => {
  const { products } = useProducts();

  const title = 'Brand new models';

  const newModels = useMemo(() => {
    const list = products?.products ?? [];

    return [...list].sort((product1, product2) => {
      return product2.year - product1.year;
    });
  }, [products]);

  return (
    <section className={styles.new__models}>
      <ProductSlider data={newModels} hasDiscount={false} title={title} />
    </section>
  );
};
