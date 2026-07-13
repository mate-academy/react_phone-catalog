import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

type Slide = {
  id: number;
  img: string;
  imgMobile?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    img: '/img/imageBanner.png',
    imgMobile: '/img/image.png',
  },
  { id: 2, img: '/img/banner-phones.png' },
  { id: 3, img: '/img/banner-accessories.png' },
  { id: 4, img: '/img/banner-tablets.png' },
];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleNext = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }

    if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pictures_slider}>
      <div className={styles.pictures_slider__wrapper}>
        <button
          className={styles.pictures_slider__nav_button}
          onClick={handlePrev}
        >
          <img
            src="/img/icons/arrow-to-left.svg"
            alt="<"
            className={styles.pictures_slider__icon}
          />
        </button>

        <div
          className={styles.pictures_slider__viewport}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={styles.pictures_slider__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map(slide => (
              <div key={slide.id} className={styles.pictures_slider__slide}>
                <picture className={styles.pictures_slider__picture}>
                  {slide.imgMobile && (
                    <source
                      media="(max-width: 639px)"
                      srcSet={slide.imgMobile}
                    />
                  )}
                  <img src={slide.img} alt={`Banner ${slide.id}`} />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.pictures_slider__nav_button}
          onClick={handleNext}
        >
          <img
            src="/img/icons/arrow-to-right.svg"
            alt=">"
            className={styles.pictures_slider__icon}
          />
        </button>
      </div>

      <div className={styles.pictures_slider__pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.pictures_slider__dot} ${currentIndex === index ? styles.pictures_slider__dot_active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
