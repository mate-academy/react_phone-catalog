import React, { useEffect, useState } from 'react';
import styles from './ProductSlider.module.scss';
import { BASE_URL } from '../../utils/const';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { Product } from '../../types/Product';

interface Props {
  title: string;
  products: Product[];
}

const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(4);

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

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - visibleCardsCount),
    );
  };

  const dissabledPrevButton = currentIndex === 0;
  const dissabledNextButton =
    currentIndex === products.length - visibleCardsCount;

  return (
    <section className={styles.productsSlider}>
      <div className={styles.topWrap}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.buttons}>
          <button
            onClick={handlePrevClick}
            className={classNames(styles.button, {
              [styles.isDisabled]: dissabledPrevButton,
            })}
          >
            <img src={`${BASE_URL}/icons/ArrowLeft.svg`} alt="Previous" />
          </button>

          <button
            onClick={handleNextClick}
            className={classNames(styles.button, {
              [styles.isDisabled]: dissabledNextButton,
            })}
          >
            <img src={`${BASE_URL}/icons/ArrowRight.svg`} alt="Next" />
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {products.map(product => (
          <div
            key={product.id}
            className={styles.sliderWrapper}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% - ${
                currentIndex * 16
              }px))`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSlider;
