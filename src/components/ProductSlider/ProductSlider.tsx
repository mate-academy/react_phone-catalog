import React, { useState } from 'react';
import { ProductGeneral } from '../../types/ProductGeneral';
import { Errow } from '../UIKit/Errow';
import { ProductCard } from '../ProductCard';
import { useWidth } from '../../hooks/useWidth';
import { MobileSwiper } from '../MobileSwiper/MobileSwiper';
import { getNumberOfItems } from '../../utils/utils';
import styles from './ProductSlider.module.scss';

type Props = {
  products: ProductGeneral[];
  sectionTitle: string;
  displayFullPrize: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  sectionTitle,
  displayFullPrize,
}) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const width = useWidth();
  const itemsPerPage = getNumberOfItems(width);

  const handleIncrease = (step: number) => {
    setDisplayIndex(prevIndex => {
      if (prevIndex + step >= products.length) {
        return products.length - 1;
      }

      return prevIndex + step;
    });
  };

  const handleDecrease = (step: number) => {
    setDisplayIndex(prevIndex => {
      if (prevIndex - step < 0) {
        return 0;
      }

      return prevIndex - step;
    });
  };

  const onSwipe = (diff: number) => {
    if (diff > 50) {
      handleDecrease(diff / 150);
    }

    if (diff < -50) {
      handleIncrease(3);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className="text--section-title">{sectionTitle}</h2>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} button button--medium`}
            onClick={() => {
              handleDecrease(1);
            }}
            disabled={displayIndex <= 0}
          >
            <Errow />
          </button>
          <button
            className="button button--medium"
            onClick={() => {
              handleIncrease(1);
            }}
            disabled={displayIndex >= products.length - 1}
          >
            <Errow />
          </button>
        </div>
      </div>
      <MobileSwiper onSwipe={onSwipe}>
        <div
          className={styles.container}
          style={
            {
              '--displayIndex': displayIndex,
              '--column-count': itemsPerPage,
            } as React.CSSProperties
          }
        >
          {products.map(item => {
            return (
              <div
                key={item.id}
                style={
                  {
                    transition: 'transform 3s',
                    transform: `translateX(calc((-100% * ${displayIndex} - 16px * ${displayIndex}))`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.item}>
                  <ProductCard
                    product={item}
                    displayFullPrice={displayFullPrize}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </MobileSwiper>
    </section>
  );
};
