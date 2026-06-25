import React, { useState, useRef } from 'react';
import { Product } from '../../../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import { getImg } from '../../../../utils/getImageUrl';
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
  const visibleCount = 4;
  const listWrapperRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const getCardWidth = () => {
    if (!listWrapperRef.current) {
      return desktopCardWidth;
    }

    const containerWidth = listWrapperRef.current.offsetWidth;

    // 4 cards + 3 gap (16px)
    return (containerWidth - 3 * 16) / 4 + 16;
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 1, products.length - visibleCount));
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
            <img src={getImg('/img/icons/arrow-left.svg')} alt="Previous" />
          </button>
          <button
            className={styles.btn}
            onClick={handleNext}
            disabled={startIndex >= products.length - visibleCount}
            aria-label="Next"
          >
            <img src={getImg('/img/icons/arrow-right.svg')} alt="Next" />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className={styles.listWrapper} ref={listWrapperRef}>
        <div
          className={styles.list}
          style={
            {
              '--mobile-offset': `${startIndex * mobileCardWidth}px`,
              '--tablet-offset': `${startIndex * tabletCardWidth}px`,
              '--desktop-offset': `${startIndex * getCardWidth()}px`,
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
