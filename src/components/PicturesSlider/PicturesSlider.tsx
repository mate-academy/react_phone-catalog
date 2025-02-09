import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const slides = [
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [current, setCurrent] = useState(0);

  const max = slides.length - 1;

  const nextSlide = () => {
    setCurrent(prev => (prev === max ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? max : prev - 1));
  };

  const dots = () => {
    const dotsNum = [];

    for (let num = 0; num <= max; num++) {
      dotsNum.push(num);
    }

    return dotsNum;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div
          className={`backBtn button ${styles.sliderButton} `}
          onClick={prevSlide}
        >
          <span className="icon arrow" />
        </div>

        <div className={`${styles.pictureContainer} `}>
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt="Slide"
              className={`${styles.picture} ${index === current ? styles.active : ''}`}
            />
          ))}
        </div>

        <button className={`${styles.sliderButton} button`} onClick={nextSlide}>
          <span className="icon arrow" />
        </button>
      </div>

      <div className={styles.dots}>
        {dots().map(dot => (
          <div
            key={dot}
            className={styles.dotContainer}
            onClick={() => setCurrent(dot)}
          >
            <input
              type="radio"
              className={styles.dot}
              checked={current === dot}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
