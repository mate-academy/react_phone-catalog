import { useEffect, useMemo, useState } from 'react';
import styles from './Slider.module.scss';
import cn from 'classnames';
import { debounce } from 'lodash';
import { sliderData } from '../../../../types/SliderData';

const SLIDER_DELAY = 5000;
const MIN_TABLET_SCREEN_SIZE = 640;
const RESIZE_DELAY = 100;

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  const handleResize = useMemo(
    () => debounce(() => setWindowWidth(window.innerWidth), RESIZE_DELAY),
    [],
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const goNext = () => {
    setCurrentSlide(prev => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const goBack = () => {
    setCurrentSlide(prev => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => goNext(), SLIDER_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.controls}>
        <button
          className={styles.btn}
          onClick={goBack}
          aria-label="Previous slide"
        >
          <img src="icons/chevron-arrow-left.svg" alt="arrow-left" />
        </button>
        <div className={styles.imgContainer}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderData.map(slide => (
              <a
                className={styles.sliderLink}
                href={`/${slide.link}`}
                key={`slide-btn-${slide.alt}`}
              >
                <img
                  className={styles.sliderImg}
                  src={
                    windowWidth >= MIN_TABLET_SCREEN_SIZE
                      ? slide.url
                      : slide.croppedImgUrl
                  }
                  alt={slide.alt}
                />
              </a>
            ))}
          </div>
        </div>
        <button className={styles.btn} onClick={goNext} aria-label="Next slide">
          <img src="icons/chevron-arrow-right.svg" alt="arrow-right" />
        </button>
      </div>
      <div className={styles.sliderBtns}>
        {sliderData.map((_, index) => (
          <button
            key={index}
            className={cn(styles.sliderBtn, {
              [styles.active]: currentSlide === index,
            })}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
