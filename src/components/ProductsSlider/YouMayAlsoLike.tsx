import React, { useCallback, useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import arrowPrev from '../../images/icons/arrow_left.svg';
import arrowPrevDark from '../../images/icons/arrow_left_for_dark.svg';
import arrowNext from '../../images/icons/arrow_right.svg';
import arrowNextDark from '../../images/icons/arrow_right_for_dark.svg';
import arrowPrevDis from '../../images/icons/arrow_left_dis.png';
import arrowNextDis from '../../images/icons/arrow_right_dis.png';

type Props = {
  products: Product[];
  title: string;
};

export const YouMayAlsoLike: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const { theme } = useContext(ThemeContext);

  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;

    if (width < 340) {
      setVisibleCards(1);
    } else if (width < 440) {
      setVisibleCards(2);
    } else if (width < 760) {
      setVisibleCards(3);
    } else if (width < 900) {
      setVisibleCards(4);
    } else {
      setVisibleCards(4);
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();

    window.addEventListener('resize', updateVisibleCards);

    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, [updateVisibleCards]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - visibleCards),
    );
  };

  return (
    <>
      <div className={cn(styles['product-slider'])}>
        <div className={cn(styles['product-slider__container'])}>
          <h2
            className={cn({
              [styles['product-slider__title']]: theme === Theme.Light,
              [styles['product-slider__title-dark']]: theme === Theme.Dark,
            })}
          >
            {title}
          </h2>
          <div className={cn(styles['product-slider__buttons'])}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={cn({
                [styles['product-slider__button']]: theme === Theme.Light,
                [styles['product-slider__button--prev']]: theme === Theme.Light,
                [styles['product-slider__button-dark']]: theme === Theme.Dark,
                [styles['product-slider__button-dark--prev']]:
                  theme === Theme.Dark,
              })}
            >
              <img
                src={
                  currentIndex === 0
                    ? theme === Theme.Dark
                      ? arrowPrev
                      : arrowPrevDis
                    : theme === Theme.Dark
                      ? arrowPrevDark
                      : arrowPrev
                }
                className={styles['product-slider__image']}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === products.length - visibleCards}
              className={cn({
                [styles['product-slider__button']]: theme === Theme.Light,
                [styles['product-slider__button--next']]: theme === Theme.Light,
                [styles['product-slider__button-dark']]: theme === Theme.Dark,
                [styles['product-slider__button-dark--next']]:
                  theme === Theme.Dark,
              })}
            >
              <img
                src={
                  currentIndex === products.length - visibleCards
                    ? theme === Theme.Dark
                      ? arrowNext
                      : arrowNextDis
                    : theme === Theme.Dark
                      ? arrowNextDark
                      : arrowNext
                }
                className={styles['product-slider__image']}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.products__container}>
        <ul className={styles.products__list}>
          {products
            .slice(currentIndex, currentIndex + visibleCards)
            .map(product => {
              return (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
