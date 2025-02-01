import styles from './ProductsSlider.module.scss';
import { IconButton } from '../../../shared/components/IconButton';
import ProductCard from '../../../shared/components/ProductCard/ProductCard';
import { ProductsContext } from '../../../shared/_store/DataProvider';
import { Product } from '../../../../_types/products';
import { useSlider } from '../../hooks/useSlider';

import { useContext, useMemo } from 'react';

type Props = {
  title: string;
  sortFn: (products: Product[]) => Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, sortFn }) => {
  const { products } = useContext(ProductsContext);
  const sortedProducts = useMemo(() => sortFn(products), [products, sortFn]);
  const { currentIndex, handlePrev, handleNext } = useSlider({
    itemCount: products.length,
  });
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= products.length - 1;

  return (
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
        {sortedProducts.slice(currentIndex, currentIndex + 4).map(product => (
          <li key={product.id} className={styles['product-slider__card']}>
            <ProductCard product={product} type={title} />
          </li>
        ))}
      </ul>
    </section>
  );
};
