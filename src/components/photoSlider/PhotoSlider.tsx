import { useSwipeable } from 'react-swipeable';
import { useCallback, useEffect, useState } from 'react';
import styles from './PhotoSlider.module.scss';
import classNames from 'classnames';

const photos = [
  {
    id: 0,
    cover: '../../img/main-banner.png',
    phone: '../../img/banner-phone.png',
    alt: 'banner-main',
  },
  {
    id: 1,
    cover: '../../img/banner-phones.png',
    phone: '../../img/banner-phone.png',
    alt: 'banner-phones',
  },
  {
    id: 2,
    cover: '../../img/main-banner.png',
    phone: '../../img/banner-phone.png',
    alt: 'banner-main',
  },
];

export const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

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
    setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
  }, []);

  const handlePrevClick = useCallback(() => {
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
    setCurrentIndex(id);
  };

  return (
    <section className={styles.banner} {...swipeHandlers}>
      <div className={styles.banner__body}>
        <div className={styles.banner__maincontent}>
          <button
            className={classNames(
              styles.banner__button,
              styles['banner__button-left'],
            )}
            onClick={handlePrevClick}
          />
          <img
            className={styles.banner__photo}
            src={
              isMobile ? photos[currentIndex].phone : photos[currentIndex].cover
            }
            alt={photos[currentIndex].alt}
          />
          <button
            className={classNames(
              styles.banner__button,
              styles['banner__button-right'],
            )}
            onClick={handleNextClick}
          />
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
