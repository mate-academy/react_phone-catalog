import { useState, useEffect } from 'react';
import styles from './Hero.module.scss';

const slides = [
  {
    desktop: 'images/banners/banner-phones-desktop.png',
    mobile: 'images/banners/banner-phones-mobile.png',
    alt: 'Phones banner',
  },
  {
    desktop: 'img/banner-tablets.png',
    alt: 'Tablets banner',
  },
  {
    desktop: 'img/banner-accessories.png',
    alt: 'Accessories  banner',
  },
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timerId);
  }, [currentIndex]);

  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.hero__slider}>
        <button
          type="button"
          className={styles.hero__button}
          onClick={handlePrev}
        >
          <img
            src="images/icons/arrow-left.png"
            alt="Previous slide"
            className={styles.hero__imageBth}
          />
        </button>

        <div className={styles.hero__slide}>
          <picture>
            <source media="(min-width: 640px)" srcSet={currentSlide.desktop} />
            <img
              src={currentSlide.mobile ?? currentSlide.desktop}
              alt={currentSlide.alt}
              className={styles.hero__image}
            />
          </picture>
        </div>

        <button
          type="button"
          className={styles.hero__button}
          onClick={handleNext}
        >
          <img
            src="images/icons/arrow-right.png"
            alt="Next slide"
            className={styles.hero__imageBth}
          />
        </button>
      </div>

      <div className={styles.hero__dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            className={
              index === currentIndex
                ? `${styles.hero__dot} ${styles.hero__dotActive}`
                : styles.hero__dot
            }
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};
