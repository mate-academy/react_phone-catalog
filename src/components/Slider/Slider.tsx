import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Slider.module.scss';

const banner1Big = '/react_phone-catalog/img/baner1.svg';
const banner1Small = '/react_phone-catalog/img/baner1small.svg';
const banner2Big = '/react_phone-catalog/img/banner-accessoriesReady.png';
const banner2Small =
  '/react_phone-catalog/img/banner-accessoriesReadySmall.png';
const banner3Big = '/react_phone-catalog/img/banner-phones.png';
const banner3Small = '/react_phone-catalog/img/banner-phonesSmall.png';

import arrowLeft from '../../assets/Icons/Arrow-left.svg';
import arrowRight from '../../assets/Icons/Arrow-right.svg';

const slides = [
  { id: 1, imageSmall: banner1Small, imageLarge: banner1Big, alt: 'banner1' },
  { id: 2, imageSmall: banner2Small, imageLarge: banner2Big, alt: 'banner2' },
  { id: 3, imageSmall: banner3Small, imageLarge: banner3Big, alt: 'banner3' },
];

export const Slider: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const carouselStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  const changeImage = (direction: number) => {
    setCurrentSlide(prev => {
      let newIndex = prev + direction;

      if (newIndex < 0) {
        newIndex = slides.length - 1;
      }

      if (newIndex >= slides.length) {
        newIndex = 0;
      }

      return newIndex;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        changeImage(1);
      } else {
        changeImage(-1);
      }
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const getSlideImage = (slide: (typeof slides)[0]) =>
    windowWidth < 640 ? slide.imageSmall : slide.imageLarge;

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      changeImage(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div
      className={styles.slider}
      ref={containerRef}
      onTouchStart={event => handleTouchStart(event)}
      onTouchEnd={event => handleTouchEnd(event)}
    >
      <div className={styles.slider__content}>
        <button
          className={classNames(styles.slider__arrow, [
            styles['slider__arrow--left'],
          ])}
          onClick={() => changeImage(-1)}
        >
          <img
            className={styles.slider__arrowIcon}
            src={arrowLeft}
            alt="arrowLeft"
          />
        </button>
        <Link to="/" className={styles.slider__link}>
          <div className={styles.slider__carousel} style={carouselStyle}>
            {slides.map(slide => (
              <img
                key={slide.id}
                className={classNames(styles.slider__image)}
                src={getSlideImage(slide)}
                alt={slide.alt}
              />
            ))}
          </div>
        </Link>
        <button
          className={classNames(styles.slider__arrow, [
            styles['slider__arrow--right'],
          ])}
          onClick={() => changeImage(1)}
        >
          <img
            className={styles.slider__arrowIcon}
            src={arrowRight}
            alt="arrowRight"
          />
        </button>
      </div>
      <div className={styles.slider__dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={classNames(styles.slider__dot, {
              [styles['slider__dot--active']]: index === currentSlide,
            })}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Перейти до слайду ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};
