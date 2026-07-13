import { Products } from '../../../hooks/useProducts';
import { Card } from '../Card';
import styles from './ProductsSlider.module.scss';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  title: string;
  products: Products;
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardContentWidth, setCardContentWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardContentWidth(cardRef.current.offsetWidth);
    }
  }, [products]);

  const cardGap = 16;
  const cardTotalWidth = cardContentWidth + cardGap;
  const translateX = -cardTotalWidth * currentIndex;

  const moveNext = () => {
    setCurrentIndex(prev => {
      return (prev + 1) % products.length;
    });
  };

  const movePrev = () => {
    setCurrentIndex(prev => {
      return Math.max(0, prev - 1);
    });
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === products.length - 1;

  return (
    <div className={styles.ProductsSlider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${isPrevDisabled ? styles.buttonDisable : ''}`}
            onClick={movePrev}
            disabled={isPrevDisabled}
          >
            <img src="/img/icons/arrow_left.svg" alt="Previous" />
          </button>
          <button
            className={`${styles.button} ${isNextDisabled ? styles.buttonDisable : ''}`}
            onClick={moveNext}
            disabled={isNextDisabled}
          >
            <img src="/img/icons/arrow_right.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.window}>
        <div
          className={styles.cards}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {products.map((product, index) => (
            <Card
              key={product.id}
              ref={index === 0 ? cardRef : null}
              id={product.itemId}
              image={product.image}
              name={product.name}
              fullPrice={product.fullPrice}
              price={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
