import { useEffect, useState } from 'react';
import styles from './MainSlider.module.scss';

import banner1 from '../../../shared/icons/MainPage/Banner.png';
import banner2 from '../../../shared/icons/MainPage/Banner.png';
import banner3 from '../../../shared/icons/MainPage/Banner.png';

import arrowLeft from '../../../shared/icons/MainPage/arrowleft.png';
import arrowRight from '../../../shared/icons/MainPage/arrowright.png';

const images = [banner1, banner2, banner3];

export const MainSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  const prev = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.slider}>
      <button onClick={prev} className={styles.arrowLeft}>
        <img src={arrowLeft} alt="left" />
      </button>

      <div className={styles.imageWrapper}>
        <img src={banner1} alt="banner" className={styles.image} />
      </div>

      <button onClick={next} className={styles.arrowRight}>
        <img src={arrowRight} alt="right" />
      </button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
