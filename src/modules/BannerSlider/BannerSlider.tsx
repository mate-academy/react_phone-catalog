import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './BannerSlider.styles.module.scss';
import { banners } from './banners';

import ArrowLeft from '../../assets/icons/VectorLeft.svg?react';
import ArrowRight from '../../assets/icons/VectorRight.svg?react';

export const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const sliderInterval = 5000;

  const handleNext = () => {
    setCurrent(prev => (prev >= banners.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent(prev => (prev <= 0 ? banners.length - 1 : prev - 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) {
      return;
    }

    const touchEnd = event.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    }

    if (diff < -50) {
      handlePrev();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev >= banners.length - 1 ? 0 : prev + 1));
    }, sliderInterval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.slider}>
      <div className={styles.content}>
        <button type="button" className={styles.arrowLeft} onClick={handlePrev}>
          <ArrowLeft />
        </button>

        <div
          className={styles.viewport}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Link to={banners[current].link} className={styles.link}>
            <img
              className={classNames(
                styles.image,
                banners[current].className &&
                  styles[banners[current].className],
              )}
              src={banners[current].image}
              alt={`Banner ${current + 1}`}
            />
          </Link>
        </div>

        <button
          type="button"
          className={styles.arrowRight}
          onClick={handleNext}
        >
          <ArrowRight />
        </button>
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={classNames(styles.dot, {
              [styles.activeDot]: current === index,
            })}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
