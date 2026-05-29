import React, { useState } from 'react';
import styles from './ProductSliderList.module.scss';
import { Phone } from '../../../../types/phone';
import { ProductSlider } from '../ProductsSlider';

type Props = {
  phones: Phone[];
};

export const ProductSliderList: React.FC<Props> = ({ phones }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const step = 1;
  const visibleCards = 4;
  const maxSlide = Math.max(0, phones.length - visibleCards);

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => Math.max(0, prevSlide - step));
  };

  const handleNextSlide = () => {
    setCurrentSlide(nextSlide => Math.min(maxSlide, nextSlide + step));
  };

  const translateValue = currentSlide * (100 / visibleCards);

  return (
    <div className={styles.listWrapper}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>Brand new models</h2>

        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            disabled={currentSlide === 0}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <img src="/img/icons/left.svg" alt="" />
          </button>

          <button
            className={styles.arrow}
            disabled={currentSlide >= maxSlide}
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <img src="/img/icons/right.svg" alt="" />
          </button>
        </div>
      </div>

      <div className={styles.sliderWindow}>
        <section
          className={styles.productSliderList}
          style={{
            transform: `translateX(-${translateValue}%)`,
          }}
        >
          {phones.map(phone => (
            <div key={phone.id} className={styles.cardWrapper}>
              <ProductSlider phone={phone} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
