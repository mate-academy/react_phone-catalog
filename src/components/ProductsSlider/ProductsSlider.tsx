import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import { debounce } from 'lodash';

interface Props {
  title: string;
  products: Product[];
  type?: string;
  hot?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  type,
  hot,
}) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);

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

  const sortedProducts = useMemo(() => {
    const updatedProducts = [...products];

    switch (type) {
      case 'new':
        updatedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'hot':
        updatedProducts.sort(
          (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
        );
        break;
      default:
        return updatedProducts;
    }

    return updatedProducts;
  }, [products, type]);

  const handleLeftClick = useCallback(() => {
    setIndex(
      prev => (prev - 1 + sortedProducts.length) % sortedProducts.length,
    );
  }, [sortedProducts.length]);

  const handleRightClick = useCallback(() => {
    setIndex(prev => (prev + 1) % sortedProducts.length);
  }, [sortedProducts.length]);

  return (
    <div className={styles['products-slider']}>
      <div className={styles['products-slider__top']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>
        <div className={styles['products-slider__buttons']}>
          <button
            className={`${styles['products-slider__button']} ${styles['products-slider__button--left']}`}
            onClick={handleLeftClick}
            disabled={index === 0}
          ></button>
          <button
            className={`${styles['products-slider__button']} ${styles['products-slider__button--right']}`}
            onClick={handleRightClick}
          ></button>
        </div>
      </div>
      <div className={styles['products-slider__slider']}>
        <div
          className={styles['products-slider__slider-wrapper']}
          style={{ transform: `translateX(-${index * slideWidth}px)` }}
        >
          {sortedProducts.map(product => (
            <div
              ref={slideRef}
              key={product.id}
              className={styles['products-slider__slide']}
            >
              <ProductCard product={product} hot={hot} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
