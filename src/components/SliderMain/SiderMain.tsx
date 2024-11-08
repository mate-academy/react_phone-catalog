import { useCallback, useEffect, useState } from 'react';
import styles from './SliderMain.module.scss';

export const SliderMain = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/img/homePage/banner-accessories.png',
    '/img/homePage/banner-phones.png',
    '/img/homePage/banner-tablets.png',
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }, [images.length]);

  const handleClickOnLowerSwitch = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, handleNext]);

  return (
    <>
      <div className={styles.slider}>
        <button className={styles.slider_buttonLeft} onClick={handlePrev}>
          <img src="/img/icons/arrow-left.png" alt="Previous" />
        </button>

        <div
          className={styles.slider_img}
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>

        <button className={styles.slider_buttonRight} onClick={handleNext}>
          <img src="/img/icons/arrow-right.png" alt="Next" />
        </button>
      </div>

      <div className={styles.slider_lowerSwitches}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.switch} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => {
              handleClickOnLowerSwitch(index);
            }}
          ></div>
        ))}
      </div>
    </>
  );
};
