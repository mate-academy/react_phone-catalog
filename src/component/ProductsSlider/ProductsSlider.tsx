import React, { useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { SliderArrows } from '../SliderArrows/SliderArrows';

const MAX_VISIBLE_ITEMS = 4;

interface Props {
  products: Product[];
  title: string;
}

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [startIndex, setStartIndex] = useState(0);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex < products.length - MAX_VISIBLE_ITEMS;
  const shouldShowArrows = products.length > MAX_VISIBLE_ITEMS;

  const handleLeft = () =>
    canScrollLeft && setStartIndex(prevIndex => prevIndex - 1);
  const handleRight = () =>
    canScrollRight && setStartIndex(prevIndex => prevIndex + 1);

  const visibleProducts = products.slice(
    startIndex,
    startIndex + MAX_VISIBLE_ITEMS,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        {shouldShowArrows && (
          <SliderArrows
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onLeftClick={handleLeft}
            onRightClick={handleRight}
          />
        )}
      </div>

      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          {visibleProducts.map(p => (
            <div className={styles.slide} key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
