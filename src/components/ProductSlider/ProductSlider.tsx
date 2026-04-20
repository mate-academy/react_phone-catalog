import { useEffect, useState } from 'react';
import styles from './ProductSlider.module.scss';

export const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const IMAGES = [
    {
      desktop: '/img/slider/banner-desctop.png',
      tablet: '/img/slider/banner-tablet.png',
      mobile: '/img/slider/16.svg',
    },
    {
      desktop: '/img/slider/v3.png',
      tablet: '/img/slider/v3.png',
      mobile: '/img/slider/17s.png',
    },
    {
      desktop: '/img/slider/vertical-second-slide.png',
      tablet: '/img/slider/vertical-second-slide.png',
      mobile: '/img/slider/lastchance.png',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === IMAGES.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className={styles.sliderWrapper}>
      <button className={styles.arrowLeft} onClick={prevSlide}>
        &#8249;
      </button>

      <div className={styles.slider}>
        <div className={styles.screen}>
          <div
            className={styles.photos}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {IMAGES.map((imgObj, index) => (
              <div className={styles.slide} key={index}>
                <picture>
                  <source media="(max-width: 639px)" srcSet={imgObj.mobile} />
                  <source
                    media="(min-width: 640px) and (max-width: 1199px)"
                    srcSet={imgObj.tablet}
                  />
                  <img src={imgObj.desktop} alt={`slide ${index}`} />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pagination}>
          {IMAGES.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
      <button className={styles.arrowRight} onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
};
