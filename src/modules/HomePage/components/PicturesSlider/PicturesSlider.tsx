import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const images = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles.slider}>
      <div className={styles.container}>
        <button
          className={styles.arrow}
          onClick={handlePrev}
          onMouseEnter={() => setIsLeftHovered(true)}
          onMouseLeave={() => setIsLeftHovered(false)}
        >
          <img
            src={
              isLeftHovered
                ? '/img/icons/ArrowLeftHover.png'
                : '/img/icons/ArrowLeftHollow.png'
            }
            alt="Previous"
          />
        </button>

        <div className={styles.frame}>
          <div
            className={styles.strip}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className={styles.slide}>
                <img
                  src={`/${img}`}
                  alt="BannerImage"
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.arrow}
          onClick={handleNext}
          onMouseEnter={() => setIsRightHovered(true)}
          onMouseLeave={() => setIsRightHovered(false)}
        >
          <img
            src={
              isRightHovered
                ? '/img/icons/ArrowRightHover.png'
                : '/img/icons/ArrowRightHollow.png'
            }
            alt="Next"
          />
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.dot, {
              [styles.active]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
