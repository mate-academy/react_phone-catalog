import React, { useEffect, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../../components/ProductCard';
import { getChevronIconSrc } from '../../../../servises/iconSrc';
import { useTheme } from '../../../../context/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';

type Props = {
  products: Product[];
  title: string;
  isHotPrice?: boolean;
  isHomePage?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  isHotPrice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);
  const { theme } = useTheme();

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setVisibleCardsCount(1);
    } else if (width >= 640 && width < 1200) {
      setVisibleCardsCount(2);
    } else {
      setVisibleCardsCount(4);
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  const chevronIconSrc = getChevronIconSrc(theme);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - visibleCardsCount),
    );
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === products.length - visibleCardsCount;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  return (
    <div className={styles.productsSlider} {...handlers}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            onClick={handlePrevClick}
            className={classNames(styles.button, {
              [styles.isDisabled]: isPrevDisabled,
            })}
            disabled={isPrevDisabled}
          >
            <img
              src={chevronIconSrc}
              alt="chevron left"
              className={styles.iconPrev}
            />
          </button>

          <button
            onClick={handleNextClick}
            className={classNames(styles.button, {
              [styles.isDisabled]: isNextDisabled,
            })}
            disabled={isNextDisabled}
          >
            <img
              src={chevronIconSrc}
              alt="chevron right"
              className={styles.iconNext}
            />
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {products.map(product => (
          <div
            key={product.id}
            className={styles.sliderWrapper}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`,
            }}
          >
            <ProductCard product={product} isHotPrice={isHotPrice} />
          </div>
        ))}
      </div>
    </div>
  );
};
