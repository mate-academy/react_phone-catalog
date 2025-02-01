import styles from './Banner.module.scss';
import { Image } from '../../types/Image';
import { useState } from 'react';

export const Banner = () => {
  const images = [Image.IMAGE_1, Image.IMAGE_2, Image.IMAGE_3];
  const [index, setIndex] = useState(0);

  const handleLeftButton = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleRightButton = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className={styles.banner}>
      <button
        className={`${styles.banner__button} ${styles['banner__button--left']}`}
        onClick={handleLeftButton}
      ></button>

      <div className={styles.banner__images}>
        <div
          className={`${styles.banner__img} ${styles[`banner__img--${images[index]}`]}`}
        ></div>
      </div>

      <button
        className={`${styles.banner__button} ${styles['banner__button--right']}`}
        onClick={handleRightButton}
      ></button>

      <div className={styles.banner__dots}>
        {images.map((_, i) => (
          <a
            key={index}
            className={`${styles.banner__dot} ${index === i ? styles[`banner__dot--is-active`] : ''}`}
            onClick={() => setIndex(i)}
          ></a>
        ))}
      </div>
    </div>
  );
};
