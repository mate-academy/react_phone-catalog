import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  '/img/banners/banner-1.webp',
  '/img/banners/banner-2.webp',
  '/img/banners/banner-3.webp',
  '/img/banners/banner-4.jpeg',
  '/img/banners/banner-5.webp',
];

export const PicturesSlider = () => {
  const [currentInd, setCurrentInd] = useState(0);
  const next = (currentInd + 1) % images.length;
  const previous = (currentInd - 1 + images.length) % images.length;

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentInd(prev => (prev + 1) % images.length),
      5000,
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <button
          className={`${styles.button} ${styles.previous}`}
          onClick={() => setCurrentInd(previous)}
        >
          <img
            className={styles.icon}
            src="/img/icons/arrow-left.svg"
            alt="Arrow left"
          />
        </button>

        <div className={styles.banners}>
          <img
            className={styles.banner}
            src={images[currentInd]}
            alt={`Banner ${currentInd + 1}`}
          />
        </div>

        <button
          className={`${styles.button} ${styles.next}`}
          onClick={() => setCurrentInd(next)}
        >
          <img
            className={styles.icon}
            src="/img/icons/arrow-right.svg"
            alt="Arrow right"
          />
        </button>
      </div>

      <div className={styles.dashes}>
        {images.map((img, i) => (
          <button
            key={img}
            className={`${styles.dash} ${currentInd === i ? styles.active : ''}`}
            onClick={() => setCurrentInd(i)}
          />
        ))}
      </div>
    </>
  );
};
