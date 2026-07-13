import styles from './PicturesSlider.module.scss';
import { useCallback, useEffect, useState } from 'react';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pictures = ['img/Banner-1.png', 'img/Banner-2.png', 'img/Banner-3.png'];

  const translateX = -100 * currentIndex;

  const moveNext = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;

      return nextIndex > pictures.length - 1 ? 0 : nextIndex;
    });
  }, [pictures.length]);

  const movePrev = () => {
    setCurrentIndex(prev => {
      const next = prev - 1;

      if (next < 0) {
        return pictures.length - 1;
      }

      return Math.max(next, 0);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, moveNext]);

  return (
    <div className={styles.pictureSlider}>
      <div className={styles.carousel}>
        <button className={styles.button} onClick={movePrev}>
          <img src="img/icons/arrow_left.svg" alt="" />
        </button>
        <div className={styles.window}>
          {pictures.map(banner => (
            <img
              key={banner}
              className={styles.banner}
              style={{ transform: `translateX(${translateX}%)` }}
              src={banner}
              alt="Banner"
            />
          ))}
        </div>
        <button className={styles.button} onClick={moveNext}>
          <img src="img/icons/arrow_right.svg" alt="" />
        </button>
      </div>
      <div className={styles.position}>
        {pictures.map((button, index) => (
          <button
            key={button}
            style={index === currentIndex ? { backgroundColor: '#313237' } : {}}
            className={styles.positionButton}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
