import React, { useMemo, useState } from 'react';
import { ProductGeneral } from '../../../types/ProductGeneral';
import styles from './ProductsSlider.module.scss';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import { usePageWidth } from '../../../hooks/usePageWidth';
import { SliderButton } from '../SliderButton';
import { Arrow } from '../Icons/Arrow/Arrow';

type Props = {
  title: string;
  products: ProductGeneral[];
  otherClass?: string;
  isFullPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  otherClass = '',
  isFullPrice = true,
}) => {
  const [currentFirstCardIndex, setCurrentFirstCardIndex] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const pageWidth = usePageWidth();

  const currentCardWidth = useMemo(() => {
    if (pageWidth < 640) {
      return 212;
    }

    if (pageWidth < 1200) {
      return 237;
    }

    return (1136 - 3 * 16) / 4;
  }, [pageWidth]);

  const countProductsOnPage = useMemo(() => {
    const widthCardsBox = pageWidth > 1200 ? 1136 : pageWidth;

    return Math.floor(widthCardsBox / currentCardWidth);
  }, [pageWidth, currentCardWidth]);

  const handleBack = () => {
    setCurrentFirstCardIndex(prevIndex => {
      if (prevIndex - countProductsOnPage - 1 <= 0) {
        return 0;
      }

      return prevIndex - countProductsOnPage;
    });
  };

  const handleNext = () => {
    setCurrentFirstCardIndex(prevIndex => {
      if (
        products.length - (prevIndex + countProductsOnPage + 1) <
        countProductsOnPage
      ) {
        return products.length - countProductsOnPage;
      }

      return prevIndex + countProductsOnPage;
    });
  };

  const handleSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const swipeEndX = event.changedTouches[0].clientX;

    if (swipeEndX - swipeStartX > 100) {
      handleBack();
    } else if (swipeStartX - swipeEndX > 100) {
      handleNext();
    }

    setSwipeStartX(0);
  };

  return (
    <section className={classNames(styles.productsSlider, otherClass)}>
      <div className={styles.productsSlider__top}>
        <h2 className={styles.productsSlider__title}>{title}</h2>
        <div className={styles.productsSlider__buttons}>
          <SliderButton
            onClick={handleBack}
            isDisabled={currentFirstCardIndex === 0}
          >
            <Arrow orientation="left" />
          </SliderButton>

          <SliderButton
            onClick={handleNext}
            isDisabled={
              currentFirstCardIndex === products.length - countProductsOnPage
            }
          >
            <Arrow orientation="right" />
          </SliderButton>
        </div>
      </div>

      <div className={styles.productsSlider__content}>
        <div
          className={styles.productsSlider__allProducts}
          style={{
            transform: `translateX(${-(
              currentFirstCardIndex * currentCardWidth +
              16 * currentFirstCardIndex
            )}px)`,
          }}
          onTouchStart={event =>
            setSwipeStartX(event.changedTouches[0].clientX)
          }
          onTouchEnd={handleSwipe}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              good={product}
              style={{
                maxWidth: `${currentCardWidth}px`,
                minWidth: `${currentCardWidth}px`,
              }}
              isFullPrice={isFullPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
