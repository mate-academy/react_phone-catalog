import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import { useNavigate } from 'react-router-dom';

const slidesDevice = ['banner-accessories', 'banner-phones', 'banner-tablets'];

const SWIPE_THRESHOLD = 50;

export const PicturesSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

  const changeSlide = (direction: number) => {
    setSlideIndex(currentIndex => {
      return (
        (currentIndex + direction + slidesDevice.length) % slidesDevice.length
      );
    });
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      changeSlide(1);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slideIndex]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < SWIPE_THRESHOLD) {
      return;
    }

    if (distance > 0) {
      changeSlide(1);
    } else {
      changeSlide(-1);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentSlide = slidesDevice[slideIndex];
  const currentLink = `${import.meta.env.BASE_URL}/img/${currentSlide}`;
  const photo = currentLink + '.png';

  return (
    <div className={styles.main}>
      <h1>Product Catalog</h1>

      <div
        className={styles.info}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className={styles.infoScroll}
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          <img src={`${import.meta.env.BASE_URL}/img/arrowLeft.svg`} alt="" />
        </button>

        <div className={styles.infoTitle}>
          <div className={styles.infoButton}>
            <div className={styles.block}>
              <p className={styles.text}>Now avaible in our store!</p>
              <p className={styles.small}>Be the first!</p>

              <button
                className={styles.infoOrder}
                onClick={() => {
                  navigate(`${currentSlide.split('-').at(-1)}`);
                }}
              >
                ORDER NOW
              </button>
            </div>
          </div>
          <img
            key={currentSlide}
            src={photo}
            alt={currentSlide}
            className={styles.infoPhoto}
          />
        </div>

        <button
          type="button"
          className={styles.infoScroll}
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          <img src={`${import.meta.env.BASE_URL}/img/arrowRight.svg`} alt="" />
        </button>
      </div>

      <div className={styles.bar}>
        {slidesDevice.map(slide => (
          <button
            key={slide}
            onClick={() => setSlideIndex(slidesDevice.indexOf(slide))}
            className={classNames(styles.barTitle, {
              [styles.barTitleActive]:
                slideIndex === slidesDevice.indexOf(slide),
            })}
          ></button>
        ))}
      </div>
    </div>
  );
};
