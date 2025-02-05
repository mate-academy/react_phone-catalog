import styles from './PicturesSlider.module.scss';
import { useSwipeable } from 'react-swipeable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { imagesMobile, imagesDesktop } from '../../data/imageData';

export const PicturesSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const images = useMemo(() => {
    return isMobile ? imagesMobile : imagesDesktop;
  }, [isMobile]);

  useEffect(() => {
    const handleRezise = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleRezise);

    return () => window.removeEventListener('resize', handleRezise);
  }, []);

  const handleLeftClick = useCallback(() => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleRightClick = useCallback(() => {
    setIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(handleRightClick, 5000);

    return () => clearInterval(intervalId);
  }, [handleRightClick]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleLeftClick(),
    onSwipedRight: () => handleRightClick(),
  });

  return (
    <div className={styles['pictures-slider']}>
      <button
        className={`${styles['pictures-slider__button']} ${styles['pictures-slider__button--left']}`}
        onClick={handleLeftClick}
      ></button>

      <div className={styles['pictures-slider__images']} {...handlers}>
        <div
          className={styles['pictures-slider__images-wrapper']}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={img}
              src={img}
              alt={`banner ${i + 1}`}
              className={styles['pictures-slider__img']}
            />
          ))}
        </div>
      </div>

      <button
        className={`${styles['pictures-slider__button']} ${styles['pictures-slider__button--right']}`}
        onClick={handleRightClick}
      ></button>

      <div className={styles['pictures-slider__dots']}>
        {images.map((img, i) => (
          <a
            key={img}
            className={`${styles['pictures-slider__dot']} ${index === i ? styles['pictures-slider__dot--is-active'] : ''}`}
            onClick={() => setIndex(i)}
          ></a>
        ))}
      </div>
    </div>
  );
};
