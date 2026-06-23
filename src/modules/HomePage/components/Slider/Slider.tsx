import styles from './Slider.module.scss';
import ArrowLeft from '../../../../assets/Chevron (Arrow Left).svg?react';
import ArrowRight from '../../../../assets/Chevron (Arrow Right).svg?react';
import Rectangle from '../../../../assets/Rectangle.svg?react';

import Slide1 from '/img/banner1.png';
import Slide2 from '/img/banner2.png';
import Slide3 from '/img/banner3.png';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const Slider = () => {
  const banners = [Slide1, Slide2, Slide3];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };

  useEffect(() => {
    const setScrollbarWidth = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    };

    setScrollbarWidth();
    window.addEventListener('resize', setScrollbarWidth);

    return () => {
      window.removeEventListener('resize', setScrollbarWidth);
    };
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  return (
    <div className={styles.slider}>
      <div className={styles.slider__сontent} {...swipeHandlers}>
        <div className={styles.slider__arrowLeft} onClick={prevSlide}>
          <ArrowLeft />
        </div>

        <div className={styles.slider__images}>
          <img key={currentSlide} src={banners[currentSlide]} alt="" />
        </div>

        <div className={styles.slider__arrowRight} onClick={nextSlide}>
          <ArrowRight />
        </div>
      </div>
      <div className={styles.slider__dots}>
        {banners.map((banner, index) => (
          <Rectangle
            className={index === currentSlide ? styles.slider__dot__active : styles.slider__dot}
            key={banner}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
