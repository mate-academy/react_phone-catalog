import React, { useState } from 'react';
import { Product } from '../../../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showFullPriceOnly?: boolean;
};

export const ProductsSlider = ({
  title,
  products,
  showFullPriceOnly = false,
}: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const mobileCardWidth = 212 + 16;
  const tabletCardWidth = 237 + 16;
  const desktopCardWidth = 272 + 16;

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 1, products.length - 1));
  };

  return (
    <section className={styles.slider}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            className={styles.btn}
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous"
          >
            <img src="/img/icons/arrow-left.svg" alt="Previous" />
          </button>
          <button
            className={styles.btn}
            onClick={handleNext}
            disabled={startIndex >= products.length - 1}
            aria-label="Next"
          >
            <img src="/img/icons/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className={styles.listWrapper}>
        <div
          className={styles.list}
          style={
            {
              '--mobile-offset': `${startIndex * mobileCardWidth}px`,
              '--tablet-offset': `${startIndex * tabletCardWidth}px`,
              '--desktop-offset': `${startIndex * desktopCardWidth}px`,
            } as React.CSSProperties
          }
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showFullPriceOnly={showFullPriceOnly}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
