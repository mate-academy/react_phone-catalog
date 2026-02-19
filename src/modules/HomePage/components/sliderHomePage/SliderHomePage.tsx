import { useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './SliderHomePage.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
const images = [
  './img/slider/slider1.png',
  './img/slider/slider2.png',
  './img/slider/slider3.png',
];

export const SliderHomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const goNext = () => {
    setActiveIndex(index => (index + 1) % images.length);
  };

  const startSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex(index => (index + 1) % images.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startSlide]);

  const goPrev = () => {
    setActiveIndex(index => (index - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goPrev,
    onSwipedRight: goNext,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.slider__box}>
          <IoIosArrowBack
            className={`${styles.slider__button}
       ${styles['slider__button--left']}`}
            onClick={goPrev}
          />
          <div
            className={styles.slider__image}
            style={{ backgroundImage: `url(${images[activeIndex]})` }}
            {...handlers}
          ></div>
          <IoIosArrowForward
            className={`${styles.slider__button} ${styles['slider__button--right']}`}
            onClick={goNext}
          />
        </div>
        <div className={styles.slider__rectangle}>
          {images.map((_, index) => (
            <span
              key={index}
              className={index === activeIndex ? styles.active : ''}
              onClick={() => {
                setActiveIndex(index);
                startSlide();
              }}
            ></span>
          ))}
        </div>
      </div>{' '}
    </div>
  );
};
