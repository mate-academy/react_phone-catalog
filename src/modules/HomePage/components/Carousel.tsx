import React, { useState } from 'react';
import { CarouselIndicator } from './CarouselIndicator';
import styles from './Carousel.module.scss';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // This would typically be stateful to reflect the current slide
  const slides = [
    '/img/banner.png',
    '/img/banner-accessories.png',
    '/img/banner-tablets.png',
  ];
  const next = () => setActiveIndex(prev => (prev + 1) % slides.length);
  const prev = () =>
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);
  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.carousel__body}>
          <div className={styles.carousel__button} onClick={prev}>
            <img src="/img/arrow-left.svg" alt="Previous" />
          </div>
          <div className={styles.carousel__imageContainer}>
            <img
              className={styles.carousel__image}
              src={slides[activeIndex]}
              alt="Carousel Slide"
            />
          </div>
          <div className={styles.carousel__button} onClick={next}>
            <img src="/img/arrow-right.svg" alt="Next" />
          </div>
        </div>
        <CarouselIndicator activeIndex={activeIndex} />
      </div>
    </>
  );
};

export default Carousel;
