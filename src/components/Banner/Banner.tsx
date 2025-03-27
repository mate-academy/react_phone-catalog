import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Banner.module.scss';
import '../../styles/App.scss';
import { NavLink } from 'react-router-dom';

const bannerItems = [
  {
    id: 'acc',
    path: '/accessories',
    src: '/img/banner-accessories.png',
    alt: 'Shop Accessories',
  },
  {
    id: 'phn',
    path: '/phones',
    src: '/img/banner-phones.png',
    alt: 'Shop Phones',
  },
  {
    id: 'tab',
    path: '/tablets',
    src: '/img/banner-tablets.png',
    alt: 'Shop Tablets',
  },
];

const Banner: React.FC = () => {
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const bannerInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const imageCount = bannerItems.length;

  const stopInterval = useCallback(() => {
    if (bannerInterval.current) {
      clearInterval(bannerInterval.current);
      bannerInterval.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    if (imageCount > 1) {
      bannerInterval.current = setInterval(() => {
        setCurrentImage(prevIndex => (prevIndex + 1) % imageCount);
      }, 5000);
    }
  }, [stopInterval, imageCount]);

  useEffect(() => {
    startInterval();

    return stopInterval;
  }, [startInterval, stopInterval]);

  const handleNextImage = () => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentImage(prevIndex => (prevIndex + 1) % imageCount);
    startInterval();
  };

  const handlePrevImage = () => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentImage(prevIndex => (prevIndex - 1 + imageCount) % imageCount);
    startInterval();
  };

  const handleDotClick = (index: number) => {
    if (index === currentImage || imageCount <= 1) {
      return;
    }

    setCurrentImage(index);
    startInterval();
  };

  useEffect(() => {
    if (imageWrapperRef.current) {
      const translateXValue = -currentImage * 33.33;

      imageWrapperRef.current.style.transform = `translateX(${translateXValue}%)`;

      imageWrapperRef.current.style.width = `${imageCount * 100}%`;
    }
  }, [currentImage, imageCount]);

  return (
    <div className={`${styles.banner} page__banner-container `}>
      <div className={styles.banner__content}>
        {imageCount > 1 && (
          <button
            className={`${styles.banner__button} ${styles['banner__button-left']}`}
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {' '}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                fill="#0F0F11"
              />{' '}
            </svg>
          </button>
        )}

        <div className={styles.banner__viewport}>
          <div
            className={styles['banner__image-wrapper']}
            ref={imageWrapperRef}
          >
            {bannerItems.map(item => (
              <NavLink
                to={item.path}
                key={item.id}
                className={styles['banner__image-link']}
                draggable="false"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={styles.banner__image}
                  loading="lazy"
                  draggable="false"
                />
              </NavLink>
            ))}
          </div>
        </div>

        {imageCount > 1 && (
          <button
            className={`${styles.banner__button} ${styles['banner__button-right']}`}
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {' '}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                fill="#0F0F11"
              />{' '}
            </svg>
          </button>
        )}
      </div>

      {imageCount > 1 && (
        <div className={styles.banner__navigation}>
          <div className={styles.banner__dots}>
            {bannerItems.map((_, index) => (
              <button
                className={`${styles.banner__dot} ${currentImage === index ? styles['banner__dot--active'] : ''}`}
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
