import { useEffect, useState, useRef } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  './img/banner.png',
  './img/banner-phones.png',
  './img/banner-tablets.png',
  './img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [active, setActive] = useState(0);

  const lastIndex = images.length - 1;

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActive(prev => (prev < lastIndex ? prev + 1 : prev));
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setActive(prev => (prev < lastIndex ? prev + 1 : prev));
    }, 5000);
  };

  const goNext = () => {
    setActive(i => (i < lastIndex ? i + 1 : i));
    resetTimer();
  };

  const goPrev = () => {
    setActive(i => (i > 0 ? i - 1 : i));
    resetTimer();
  };

  return (
    <section className={styles.slider} aria-label="Promotions slider">
      <button
        type="button"
        className={styles.arrow}
        onClick={goPrev}
        aria-label="Previous banner"
      >
        {'<'}
      </button>

      <div className={styles.window}>
        {active === 0 ? (
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet="./img/banner-mobile.png"
            />
            <img className={styles.image} src="./img/banner.png" alt="Banner" />
          </picture>
        ) : (
          <img className={styles.image} src={images[active]} alt="Banner" />
        )}
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={goNext}
        aria-label="Next banner"
      >
        {'>'}
      </button>

      <div className={styles.dots}>
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={
              idx === active ? `${styles.dot} ${styles.dotActive}` : styles.dot
            }
            onClick={() => setActive(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            aria-pressed={idx === active}
          />
        ))}
      </div>
    </section>
  );
};
