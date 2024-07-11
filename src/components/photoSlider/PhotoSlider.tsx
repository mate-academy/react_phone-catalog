import { useSwipeable } from 'react-swipeable';
import { useCallback, useEffect, useState } from 'react';
import styles from './PhotoSlider.module.scss';
import classNames from 'classnames';

const photos = [
  {
    id: 0,
    cover: 'img/main-banner.png',
    phone: 'img/banner-phone.png',
    alt: 'banner-main',
  },
  {
    id: 1,
    cover: 'img/banner-phones.png',
    phone: 'img/banner-phone.png',
    alt: 'banner-phones',
  },
  {
    id: 2,
    cover: 'img/banner-tablets.png',
    phone: 'img/banner-phone.png',
    alt: 'banner-main',
  },
];

export const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [direction, setDirection] = useState('');

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNextClick = useCallback(() => {
    setDirection('next');
    setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
  }, []);

  const handlePrevClick = useCallback(() => {
    setDirection('prev');
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + photos.length) % photos.length,
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNextClick]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePrevClick,
    trackMouse: true,
  });

  const handleDotsClick = (id: number) => {
    setDirection(id > currentIndex ? 'next' : 'prev');
    setCurrentIndex(id);
  };

  return (
    <section className={styles.banner} {...swipeHandlers}>
      <div className={styles.banner__body}>
        <div className={styles.banner__maincontent}>
          {!isMobile && (
            <button
              className={styles.banner__button_wrapper}
              onClick={handlePrevClick}
            >
              <img
                className={classNames(
                  styles.banner__button,
                  styles.banner__button_left,
                )}
                src="img/icons/chevron.svg"
                alt=""
              />
            </button>
          )}

          <div className={styles.banner__photoWrapper}>
            {photos.map((photo, index) => (
              <img
                key={photo.id}
                className={classNames(styles.banner__photo, {
                  [styles.banner__photo_active]: index === currentIndex,
                  [styles.banner__photo_next]:
                    direction === 'next' &&
                    index === (currentIndex + 1) % photos.length,
                  [styles.banner__photo_prev]:
                    direction === 'prev' &&
                    index ===
                      (currentIndex - 1 + photos.length) % photos.length,
                })}
                src={isMobile ? photo.phone : photo.cover}
                alt={photo.alt}
              />
            ))}
          </div>

          {!isMobile && (
            <button
              className={styles.banner__button_wrapper}
              onClick={handleNextClick}
            >
              <img
                className={classNames(
                  styles.banner__button,
                  styles.banner__button_right,
                )}
                src="img/icons/chevron.svg"
                alt=""
              />
            </button>
          )}
        </div>
        <div className={styles.banner__dots}>
          {photos.map(photo => (
            <button
              key={photo.id}
              onClick={() => handleDotsClick(photo.id)}
              className={classNames(styles.banner__dot, {
                [styles.banner__dot_active]: currentIndex === photo.id,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
