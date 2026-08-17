import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';

import bannerImg from '../../../../assets/images/banner-phones.webp';
import bannerAccs from '../../../../assets/images/banner-accs.webp';
import bannerTablets from '../../../../assets/images/banner-tablets.webp';

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  imgSrc: string;
}

const sliderItems: SlideItem[] = [
  {
    id: 1,
    title: 'Now available in our store!',
    subtitle: 'iPhone 14 Pro',
    buttonText: 'ORDER NOW',
    link: '/phones',
    imgSrc: bannerImg,
  },
  {
    id: 2,
    title: 'Tablets now in our store',
    subtitle: 'iPad Pro & Air series',
    buttonText: 'DISCOVER',
    link: '/tablets',
    imgSrc: bannerTablets,
  },
  {
    id: 3,
    title: 'Also you can look for accessories',
    subtitle: '-20% on accessories',
    buttonText: 'SHOP NOW',
    link: '/accessories',
    imgSrc: bannerAccs,
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <button
          type="button"
          className={`${styles.slider__btn} ${styles['slider__btn--prev']}`}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div
          className={styles.slider__viewport}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={styles.slider__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sliderItems.map(item => (
              <div key={item.id} className={styles.slider__slide}>
                <div className={styles['slider__slide-content']}>
                  <h2 className={styles['slider__slide-title']}>
                    {item.title}
                  </h2>
                  <p className={styles['slider__slide-subtitle']}>
                    {item.subtitle}
                  </p>
                  <Link to={item.link} className={styles['slider__slide-btn']}>
                    {item.buttonText}
                  </Link>
                </div>

                <div className={styles['slider__slide-image-wrapper']}>
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className={styles['slider__slide-image']}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.slider__btn} ${styles['slider__btn--next']}`}
          onClick={handleNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className={styles.slider__dots}>
        {sliderItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.slider__dot} ${
              index === currentIndex ? styles['slider__dot--active'] : ''
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
