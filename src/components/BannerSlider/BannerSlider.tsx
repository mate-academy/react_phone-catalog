import { useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { Link } from 'react-router-dom';

import { FadeImage } from '../FadeImage';
import { IconButton } from '../IconButton';
import { ROUTES } from '../../constants/routes';
import { useTranslation } from '../../hooks';
import styles from './BannerSlider.module.scss';

type Slide = {
  id: number;
  image: string;
  altKey: 'phonesBannerAlt' | 'tabletsBannerAlt' | 'accessoriesBannerAlt';
  path: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: 'img/banner-phones.png',
    altKey: 'phonesBannerAlt',
    path: ROUTES.phones,
  },
  {
    id: 2,
    image: 'img/banner-tablets.png',
    altKey: 'tabletsBannerAlt',
    path: ROUTES.tablets,
  },
  {
    id: 3,
    image: 'img/banner-accessories.png',
    altKey: 'accessoriesBannerAlt',
    path: ROUTES.accessories,
  },
];

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

export const BannerSlider = () => {
  const t = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const maxIndex = slides.length - 1;

  const handlePrev = () => {
    setActiveIndex(current => (current === 0 ? maxIndex : current - 1));
  };

  const handleNext = () => {
    setActiveIndex(current => (current === maxIndex ? 0 : current + 1));
  };

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex(current => (current === maxIndex ? 0 : current + 1));
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timerId);
    };
  }, [maxIndex]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < SWIPE_THRESHOLD) {
      return;
    }

    if (distance > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className={styles.slider} aria-label={t.home.bannerSlider}>
      <div className={styles.content}>
        <IconButton
          icon="chevronLeft"
          label={t.home.previousBanner}
          shape="slider"
          className={styles.arrowButton}
          onClick={handlePrev}
        />

        <div
          className={styles.viewport}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.track}
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {slides.map(({ id, image, altKey, path }, index) => (
              <Link
                className={styles.slide}
                to={path}
                key={id}
                aria-hidden={index !== activeIndex}
                tabIndex={index === activeIndex ? 0 : -1}
              >
                <FadeImage
                  className={styles.image}
                  src={`${import.meta.env.BASE_URL}${image}`}
                  alt={t.home[altKey]}
                />
              </Link>
            ))}
          </div>
        </div>

        <IconButton
          icon="chevronRight"
          label={t.home.nextBanner}
          shape="slider"
          className={styles.arrowButton}
          onClick={handleNext}
        />
      </div>

      <div className={styles.dots}>
        {slides.map(({ id }, index) => {
          const isActive = index === activeIndex;
          const bannerNumber = index + 1;

          return (
            <button
              className={
                isActive ? `${styles.dot} ${styles.dotActive}` : styles.dot
              }
              type="button"
              aria-label={
                isActive
                  ? `${t.home.currentBanner}: ${bannerNumber}`
                  : `${t.home.goToBanner} ${bannerNumber}`
              }
              aria-current={isActive ? 'true' : undefined}
              key={id}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
    </section>
  );
};
