import React, { useEffect, useState } from 'react';
import styles from './Slider.module.scss';

const slidesData = [
  {
    id: 1,
    img: '/img/Banner.png',
  },
  {
    id: 2,
    img: '/img/banner-accessories.png',
  },
  {
    id: 3,
    img: '/img/banner-phones.png',
  },
];

export const Slider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.prev} onClick={prevSlide}></div>

      <div
        className={styles.slides}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slidesData.map(slide => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.img} alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </div>

      <div className={styles.next} onClick={nextSlide}></div>

      <div className={styles.dots}>
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              current === index ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
