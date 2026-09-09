import { useEffect, useState } from 'react';
import chevronLeft from '../../../shared/assets/icons/chevron-left.svg';
import chevronRight from '../../../shared/assets/icons/chevron-right.svg';
import styles from './PicturesSlider.module.scss';

const banners = [
  './img/banner-home.png', // баннер из макета (iPhone 14 Pro)
  './img/banner-tablets.png',
  './img/banner-accessories.png',
];

const SLIDE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    // зацикливание в обе стороны: -1 → последний, length → 0
    setCurrent((index + banners.length) % banners.length);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // авто-смена каждые 5с; current в зависимостях — таймер
  // перезапускается после ручного листания, отсчёт начинается заново
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrent(prevIndex => (prevIndex + 1) % banners.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timerId);
  }, [current]);

  return (
    <section className={styles.slider}>
      <button
        type="button"
        className={styles.arrow}
        onClick={prev}
        aria-label="Previous slide"
      >
        <img src={chevronLeft} alt="" />
      </button>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map(banner => (
            <img
              key={banner}
              src={banner}
              alt="Promo banner"
              className={styles.slide}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={next}
        aria-label="Next slide"
      >
        <img src={chevronRight} alt="" />
      </button>

      <div className={styles.dots}>
        {banners.map((banner, index) => (
          <button
            type="button"
            key={banner}
            className={index === current ? styles.dotActive : styles.dot}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
