import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  '/img/banner.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export const PicturesSlider = () => {
  const [active, setActive] = useState(0);

  const lastIndex = images.length - 1;

  const goPrev = () => setActive(i => (i - 1 + images.length) % images.length);
  const goNext = () => setActive(i => (i + 1) % images.length);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive(prev => (prev === lastIndex ? 0 : prev + 1));
    }, 5000);

    return () => window.clearInterval(id);
  }, [lastIndex]);

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
        <img className={styles.image} src={images[active]} alt="Banner" />
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
