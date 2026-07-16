import { FirstBanner } from './components/FirstBanner';
import { SecondBanner } from './components/SecondBanner';
import { ThirdBanner } from './components/ThirdBanner';
import styles from './PicturesSlider.module.scss';
import { useCallback, useEffect, useState } from 'react';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    <FirstBanner key="1" />,
    <SecondBanner key="2" />,
    <ThirdBanner key="3" />,
  ];

  const translateX = -100 * currentIndex;

  const moveNext = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;

      return nextIndex > banners.length - 1 ? 0 : nextIndex;
    });
  }, [banners.length]);

  const movePrev = () => {
    setCurrentIndex(prev => {
      const next = prev - 1;

      if (next < 0) {
        return banners.length - 1;
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
          {banners.map(banner => (
            <div
              key={banner.key}
              className={styles.banner}
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {banner}
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={moveNext}>
          <img src="img/icons/arrow_right.svg" alt="" />
        </button>
      </div>
      <div className={styles.position}>
        {banners.map((button, index) => (
          <button
            key={button.key}
            style={index === currentIndex ? { backgroundColor: '#313237' } : {}}
            className={styles.positionButton}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
