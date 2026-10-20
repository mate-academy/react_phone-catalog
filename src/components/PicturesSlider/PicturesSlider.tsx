import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const BANNERS = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slider} data-cy="PicturesSlider">
      <div className={styles.slider__container}>
        <button
          className={styles.slider__btn}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className={styles.slider__content}>
          <div
            className={styles.slider__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner, index) => (
              <img
                key={banner}
                src={banner}
                alt={`Banner ${index + 1}`}
                className={styles.slider__image}
              />
            ))}
          </div>
        </div>

        <button
          className={styles.slider__btn}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className={styles.slider__dots}>
        {BANNERS.map((banner, index) => (
          <button
            key={banner}
            className={classNames(styles.slider__dot, {
              [styles['slider__dot--active']]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
