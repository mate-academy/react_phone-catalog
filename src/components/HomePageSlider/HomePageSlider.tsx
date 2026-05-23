import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styles from './HomePageSlider.module.scss';

const images = [
  'img/banner-accessories.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const HomePageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    }

    if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className={styles.HomePageSlider}>
      <button
        type="button"
        className={classNames(
          styles.slider__button,
          styles['slider__button--left'],
        )}
        onClick={prevSlide}
        aria-label="Previous slide"
      />

      <div
        className={styles.banner}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="Banner"
            className={classNames(styles.banner__image, {
              [styles['banner__image--active']]: index === currentIndex,
            })}
          />
        ))}
      </div>

      <button
        type="button"
        className={classNames(
          styles.slider__button,
          styles['slider__button--right'],
        )}
        onClick={nextSlide}
        aria-label="Next slide"
      />

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={classNames(styles.dots__item, {
              [styles['dots__item--active']]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
