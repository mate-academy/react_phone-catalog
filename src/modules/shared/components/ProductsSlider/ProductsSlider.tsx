import styles from './ProductsSlider.module.scss';
import { IconButton } from '../IconButton';
import ProductCard from '../ProductCard/ProductCard';
import { ProductsContext } from '../../_store/ProductsProvider';
import { Category, Product } from '../../../../_types/products';
import { useSlider } from '../../../../_hooks/useSlider';

import { useContext, useMemo } from 'react';
import { Loader } from '../Loader';
import { ButtonPrimary } from '../ButtonPrimary';

type Props = {
  title: string;
  sortFn: (products: Product[], category?: Category) => Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, sortFn }) => {
  const { products, loading, error } = useContext(ProductsContext);
  const sortedProducts = useMemo(() => sortFn(products), [products, sortFn]);
  const { currentIndex, handlePrev, handleNext } = useSlider({
    itemCount: products.length,
  });
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= products.length - 1;

  return (
    <>
      {error ? (
        <div className={styles.productsPage__error}>
          <p>{error}</p>
          <ButtonPrimary
            title="Reload"
            onClick={() => window.location.reload()}
          />
        </div>
      ) : loading ? (
        <Loader />
      ) : products ? (
        <section className={styles['product-slider']}>
          <div className={styles['product-slider__top']}>
            <h2 className={styles['product-slider__title']}>{title}</h2>
            <div className={styles['product-slider__buttons']}>
              <IconButton
                direction="left"
                modificator={'arrow'}
                disabled={isFirst}
                onClick={handlePrev}
              />
              <IconButton
                direction="right"
                modificator={'arrow'}
                disabled={isLast}
                onClick={handleNext}
              />
            </div>
          </div>
          <ul className={styles['product-slider__wrapper']}>
            {sortedProducts
              .slice(currentIndex, currentIndex + 4)
              .map(product => (
                <li key={product.id} className={styles['product-slider__card']}>
                  <ProductCard
                    product={product}
                    isShowfullPrice={title !== 'Brand new models'}
                  />
                </li>
              ))}
          </ul>
        </section>
      ) : null}
    </>
  );
};
