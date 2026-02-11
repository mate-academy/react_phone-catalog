import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../api/products';
import { ProductCard } from '../ProductCard';

interface Props {
  title: string;
  products: Product[];

  // І тепер тут додав, щоб ігнорувати знижку для слайдера "Brand new models" як по Figma
  isFullPrice?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isFullPrice = false,
}) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const checkScrollButtons = () => {
      setIsPrevDisabled(slider.scrollLeft === 0);
      setIsNextDisabled(
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth,
      );
    };
    checkScrollButtons();
    slider.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      slider.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [products]);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth * 0.8,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth * 0.8,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.productsSlider}>
      <div className={styles.productsSlider__header}>
        <h2 className={styles.productsSlider__title}>{title}</h2>
        <div className={styles.productsSlider__controls}>
          <button
            className={styles.productsSlider__button}
            aria-label="Scroll left"
            onClick={handlePrev}
            disabled={isPrevDisabled}
          >
            <img src="./icons/Chevron (Arrow Left).svg" alt="left" />
          </button>

          <button
            className={styles.productsSlider__button}
            aria-label="Scroll right"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            <img src="./icons/Chevron (Arrow Right).svg" alt="right" />
          </button>
        </div>
      </div>
      <div className={styles.productsSlider__list} ref={sliderRef}>
        {products.map(product => (
          <div className={styles.productsSlider__cardWrap} key={product.id}>
            <ProductCard product={product} isFullPrice={isFullPrice} />
          </div>
        ))}
      </div>
    </section>
  );
};
