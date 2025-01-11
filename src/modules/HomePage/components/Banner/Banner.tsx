import React, { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Banner: React.FC = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>(
    'mobile',
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const phoneSlides = [
    'Images//Phone-Banner1.png',
    'Images//Phone-Banner1.png',
    'Images//Phone-Banner1.png',
  ];
  const tabletSlides = [
    'Images//Tablet-Banner1.png',
    'Images//Tablet-Banner1.png',
    'Images//Tablet-Banner1.png',
  ];

  const updateScreenSize = () => {
    const width = window.innerWidth;

    if (width >= 1200) {
      setScreenSize('desktop');
    } else if (width >= 640) {
      setScreenSize('tablet');
    } else {
      setScreenSize('mobile');
    }
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [screenSize]);

  const slides = screenSize === 'mobile' ? phoneSlides : tabletSlides;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentIndex(prevState =>
      prevState === slides.length - 1 ? 0 : prevState + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prevState =>
      prevState === 0 ? slides.length - 1 : prevState - 1,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd >= 5) {
      handleNext();
    }

    if (touchStart - touchEnd <= -5) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.slider__track}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <NavLink
              to={'/catalog/phones/apple-iphone-14-pro-1tb-spaceblack'}
              className={styles.slider__item}
              key={index}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className={styles.slider__image}
              />
            </NavLink>
          ))}
        </div>

        <button className={styles.slider__prev} onClick={handlePrev}></button>
        <button className={styles.slider__next} onClick={handleNext}></button>

        <div className={styles.slider__indicators}>
          {slides.map((_, index) => (
            <span
              onClick={() => setCurrentIndex(index)}
              key={index}
              className={classNames(styles.slider__dot, {
                [styles['slider__dot--is-active']]: index === currentIndex,
              })}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};
