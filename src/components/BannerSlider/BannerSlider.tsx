import React, { useState, useEffect } from 'react';
import styles from './BannerSlider.module.scss';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';

export const BannerSlider: React.FC = () => {
  const sliderImages = [
    './img/banner-1.png',
    './img/banner-2.png',
    './img/banner-3.png',
  ];

  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

  const handleClick = (index: number) => {
    setDisplayedImageIndex(index);
  };

  const incrementDisplayedImageIndex = () => {
    setDisplayedImageIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const decrementDisplayedImageIndex = () => {
    setDisplayedImageIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(incrementDisplayedImageIndex, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className={styles.bannerSlider}>
        <div className={styles.topWrapper}>
          <div className={styles.buttons}>
            <button
              className={`${styles.arrowButton} ${displayedImageIndex === 0 ? styles.buttonDisabled : ""}`}
              onClick={decrementDisplayedImageIndex}
            >
              <img
                src={ChevronIcon}
                alt="scroll left"
                className={styles.iconPrev}
              />
            </button>

            <div className={styles.container}>
              <div
                className={styles.sliderWrapper}
                style={{ transform: `translateX(-${displayedImageIndex * 100}%)` }}
              >
                {sliderImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className={styles.slide}
                    alt={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              className={`${styles.arrowButton} ${displayedImageIndex === sliderImages.length - 1 ? styles.buttonDisabled : ""}`}
              onClick={incrementDisplayedImageIndex}
            >
              <img
                src={ChevronIcon}
                alt="scroll right"
                className={styles.iconNext}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.markers}>
        {sliderImages.map((_, index) => (
          <div
            className={`${
              index === displayedImageIndex
                ? styles.markerDisplayed
                : styles.marker
            }`}
            key={index}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
