import { useState, useEffect } from 'react';
import { CarouselIndicator } from './CarouselIndicator';
import styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeContext';
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon';

export const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { theme } = useTheme();
  const slides = [
    { image: 'img/phone-banner.webp', link: '/phones' },
    { image: 'img/tablet-banner.webp', link: '/tablets' },
    { image: 'img/headset-banner.webp', link: '/accessories' },
  ];
  const mobileSlides = [
    { image: 'img/phone-banner-mobile.webp', link: '/phones' },
    { image: 'img/tablet-banner-mobile.webp', link: '/tablets' },
    { image: 'img/headset-banner-mobile.webp', link: '/accessories' },
  ];

  const next = () => {
    setActiveIndex(prev => (prev + 1) % slides.length);
  };

  const prev = () =>
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex]);
  const MIN_SWIPE_DISTANCE = 25;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      next();
    }

    if (isRightSwipe) {
      prev();
    }
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__body}>
        <button
          className={`${styles.carousel__button} ${theme === 'dark' ? styles['carousel__button--dark'] : ''}`}
          onClick={prev}
        >
          <ArrowIcon direction="left" />
        </button>

        <div
          className={styles.carousel__window}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.carousel__list}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <Link
                key={index}
                to={slide.link}
                className={styles.carousel__slide}
              >
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet={mobileSlides[index].image}
                  />
                  <img
                    className={styles.carousel__image}
                    src={slide.image}
                    alt={`Slide ${index}`}
                  />
                </picture>
              </Link>
            ))}
          </div>
        </div>

        <button
          className={`${styles.carousel__button} ${theme === 'dark' ? styles['carousel__button--dark'] : ''}`}
          onClick={next}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
      <CarouselIndicator
        activeIndex={activeIndex}
        numberOfSlides={slides.length}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
};
