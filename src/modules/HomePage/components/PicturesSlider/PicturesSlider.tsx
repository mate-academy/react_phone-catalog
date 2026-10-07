import styles from './PicturesSlider.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
};

const slider = [
  {
    image: '/img/banner-phones.png',
    link: '/phones',
  },
  {
    image: '/img/banner-tablets.png',
    link: '/tablets',
  },
  {
    image: '/img/banner-accessories.png',
    link: '/accessories',
  },
];

const SWIPE_THRESHOLD = 50;

export const PicturesSlider: React.FC<Props> = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const currentSlide = slider[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;

      if (nextIndex >= slider.length) {
        return 0;
      }

      return nextIndex;
    });
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - 1;

      if (nextIndex < 0) {
        return slider.length - 1;
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [handleNext]);

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEnd = event.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > SWIPE_THRESHOLD) {
      handleNext();
    } else if (swipeDistance < -SWIPE_THRESHOLD) {
      handlePrev();
    }
  };

  return (
    <section className={styles.pictures_slider}>
      <h2 className={styles.pictures_slider__title}>{title}</h2>

      <div className={styles.pictures_slider__container}>
        <button
          type="button"
          className={styles.pictures_slider__container__button}
          onClick={handlePrev}
        >
          <img
            className={styles.pictures_slider__container__button__img}
            src="/img/icons/left.svg"
            alt="Left menu"
          />
        </button>

        <div
          className={styles.pictures_slider__container__slide}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Link
            to={currentSlide.link}
            className={styles.pictures_slider__container__order}
          >
            ORDER NOW
          </Link>

          <img
            src={currentSlide.image}
            className={styles.pictures_slider__container__slide__image}
            alt="Banner"
          />
        </div>

        <button
          type="button"
          className={styles.pictures_slider__container__button}
          onClick={handleNext}
        >
          <img
            className={styles.pictures_slider__container__button__img}
            src="/img/icons/right.svg"
            alt="Right menu"
          />
        </button>
      </div>

      <div className={styles.pictures_slider__indicators}>
        {slider.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setCurrentIndex(index);
            }}
          >
            <p className={index === currentIndex ? styles.active : ''}>_</p>
          </button>
        ))}
      </div>
    </section>
  );
};
