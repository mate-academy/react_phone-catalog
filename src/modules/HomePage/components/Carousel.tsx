import { useState } from 'react';
import { CarouselIndicator } from './CarouselIndicator';
import styles from './Carousel.module.scss';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // This would typically be stateful to reflect the current slide
  const slides = [
    'img/banner.png',
    'img/banner-accessories.png',
    'img/banner-tablets.png',
  ];
  const next = () => setActiveIndex(prev => (prev + 1) % slides.length);
  const prev = () =>
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <section className={styles.carousel}>
        <div className={styles.carousel__body}>
          <button className={styles.carousel__button} onClick={prev}>
            <img src="img/arrow-left.svg" alt="Previous" />
          </button>
          <div className={styles.carousel__imageContainer}>
            <img
              className={styles.carousel__image}
              src={slides[activeIndex]}
              alt="Carousel Slide"
            />
          </div>
          <button className={styles.carousel__button} onClick={next}>
            <img src="img/arrow-right.svg" alt="Next" />
          </button>
        </div>
        <CarouselIndicator activeIndex={activeIndex} />
      </section>
    </>
  );
};

export default Carousel;
