import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import { debounce } from 'lodash';

interface Props {
  products: Product[];
  index: number;
}

export const ProductsSlider: React.FC<Props> = ({ products, index }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const updateSlideWidth = debounce(() => {
    if (slideRef.current) {
      setSlideWidth(slideRef.current.clientWidth);
    }
  }, 100);

  useEffect(() => {
    updateSlideWidth();

    window.addEventListener('resize', updateSlideWidth);

    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [updateSlideWidth]);

  return (
    <div className={styles['products-slider']}>
      <div
        className={styles['products-slider__wrapper']}
        style={{ transform: `translateX(-${index * slideWidth}px)` }}
      >
        {products.map(product => (
          <div
            ref={slideRef}
            key={product.id}
            className={styles['products-slider__slide']}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
