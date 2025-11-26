import { useEffect, useState } from 'react';
import styles from './MainSlider.module.scss';

const images = [
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const MainSlider = () => {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        <ul
          className={styles.slider__list}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <li key={i} className={styles.slider__item}>
              <img src={image} alt={`Slide ${i + 1}`} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={prevImage}
        className={`${styles.icon} ${styles['icon--prev']}`}
      />

      <button
        type="button"
        onClick={nextImage}
        className={`${styles.icon} ${styles['icon--next']}`}
      />

      <div className={styles.slider__dots}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
