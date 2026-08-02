import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const slidesNotebook = ['iphone14pro', 'iphone17Pro', 'iPad', 'watch'];
const slidesPhone = ['iphone14pro-mobile', 'iPad', 'watch'];
const slides =
  640 > window.innerWidth && window.innerWidth > 340
    ? slidesPhone
    : slidesNotebook;

const SWIPE_THRESHOLD = 50;

export const PicturesSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const changeSlide = (direction: number) => {
    setSlideIndex(currentIndex => {
      return (currentIndex + direction + slides.length) % slides.length;
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

  const currentSlide = slides[slideIndex];
  const currentLink = `${import.meta.env.BASE_URL}/img/${currentSlide}`;
  const photo = currentLink + '.jpg';

  return (
    <div className={styles.main}>
      <h1>Welcome to Nice Gadgets store!</h1>

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
        {slides.map(slide => (
          <button
            key={slide}
            onClick={() => setSlideIndex(slides.indexOf(slide))}
            className={classNames(styles.barTitle, {
              [styles.barTitleActive]: slideIndex === slides.indexOf(slide),
            })}
          ></button>
        ))}
      </div>
    </div>
  );
};
