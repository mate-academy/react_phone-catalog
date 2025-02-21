import React, { useEffect, useState } from 'react';
import styles from './CarouselHome.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { useWindowSize } from '../../hooks/useWindowSize';

type Props = {
  products: Product[];
  name: string;
};

export const Carousel: React.FC<Props> = ({ products, name }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowSize();
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    if (width >= 1200) {
      setVisibleItems(4);
    } else if (width >= 950) {
      setVisibleItems(3);
    } else {
      setVisibleItems(2);
    }
  }, [width]);

  const nextSlide = () => {
    setIndex(prevIndex =>
      prevIndex + 1 >= products.length - visibleItems + 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setIndex(prevIndex =>
      prevIndex === 0 ? products.length - visibleItems : prevIndex - 1,
    );
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <h2>{name}</h2>
        <div>
          <button
            className={styles.arrow}
            onClick={prevSlide}
            disabled={products.length <= 1}
          >
            <img src="/img/servic/arrow-left.svg" alt="arrow" />
          </button>
          <button
            className={styles.arrow}
            onClick={nextSlide}
            disabled={products.length <= 1}
          >
            <img src="/img/servic/arrow-right.svg" alt="arrow" />
          </button>
        </div>
      </div>

      <div className={styles.carousel__container}>
        <div
          className={styles.carousel__track}
          style={{ transform: `translateX(-${index * (100 / visibleItems)}%)` }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.carousel__item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
