import { useCallback, useMemo, useState } from 'react';
import { useProducts } from '../../store/ProductsContext';
import { ProductsSlider } from '../ProductsSlider';
import styles from './NewModels.module.scss';

export const NewModels = () => {
  const { products } = useProducts();
  const [index, setIndex] = useState(0);

  const sortedProducts = useMemo(() => {
    const updatedProducts = [...products];

    updatedProducts.sort((a, b) => b.year - a.year);

    return updatedProducts;
  }, [products]);

  const handleLeftClick = useCallback(() => {
    setIndex(prev => (prev - 1 + products.length) % products.length);
  }, [products.length]);

  const handleRightClick = useCallback(() => {
    setIndex(prev => (prev + 1) % products.length);
  }, [products.length]);

  return (
    <div className={styles['new-models']}>
      <div className={styles['new-models__top']}>
        <h2 className={styles['new-models__title']}>Brand new models</h2>
        <div className={styles['new-models__buttons']}>
          <button
            className={`${styles['new-models__button']} ${styles['new-models__button--left']}`}
            onClick={handleLeftClick}
            disabled={index === 0}
          ></button>
          <button
            className={`${styles['new-models__button']} ${styles['new-models__button--right']}`}
            onClick={handleRightClick}
          ></button>
        </div>
      </div>
      <ProductsSlider products={sortedProducts} index={index} />
    </div>
  );
};
