import { useState, useEffect } from 'react';
import { CarouselIndicator } from './CarouselIndicator';
import styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

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
    setTouchEnd(null); // Скидаємо попередній кінець
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return; // Ігноруємо, якщо немає початку чи кінця

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      next(); // Свайп вліво -> наступний слайд
    }
    if (isRightSwipe) {
      prev(); // Свайп вправо -> попередній слайд
    }
  };
  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__body}>
        <button
          className={`${styles.carousel__button} ${theme === 'dark' ? styles['carousel__button--dark'] : ''}`}
          onClick={prev}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.4712 3.52864C10.2109 3.26829 9.78878 3.26829 9.52843 3.52864L5.52843 7.52864C5.26808 7.78899 5.26808 8.2111 5.52843 8.47145L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00004L10.4712 4.47145C10.7316 4.2111 10.7316 3.78899 10.4712 3.52864Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Це наше "вікно" перегляду */}
        <div
          className={styles.carousel__window}
          // 🔥 Додаємо обробники дотику сюди:
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Це стрічка, яка рухається */}
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
              fill="currentColor"
            />
          </svg>
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
