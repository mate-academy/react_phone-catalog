import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './PictureSlider.module.scss';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
import { useTouchSlider } from '../../utils/hooks/useTouchSlider';

export const PictureSlider = () => {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const mobileSlides = useMemo(
    () => [
      {
        src: '/img/banner-phones-small.png',
        alt: 'Banner phones',
        link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
      },
      {
        src: '/img/banner-tablets-small.png',
        alt: 'Banner tablets',
        link: '/tablets',
      },
      {
        src: '/img/banner-accesories-small.png',
        alt: 'Banner accessories',
        link: '/accessories',
      },
    ],
    [],
  );

  const desktopSlides = useMemo(
    () => [
      {
        src: '/img/banner-phones-large.png',
        alt: 'Banner phones',
        link: '/phones/apple-iphone-14-pro-128gb-spaceblack',
      },
      {
        src: '/img/banner-tablets-large.png',
        alt: 'Banner tablets',
        link: '/tablets',
      },
      {
        src: '/img/banner-accesories-large.png',
        alt: 'Banner accessories',
        link: '/accessories',
      },
    ],
    [],
  );

  const slides = isMobile ? mobileSlides : desktopSlides;
  const totalSlides = slides.length;

  const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]];

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (!isAnimating && !isDisabled) {
        setCurrentSlide(slideIndex);
        setIsAnimating(true);
        setIsDisabled(true);
      }
    },
    [isAnimating, isDisabled],
  );

  const nextSlide = useCallback(() => {
    if (!isDisabled) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide, isDisabled]);

  const prevSlide = useCallback(() => {
    if (!isDisabled) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide, isDisabled]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlider(
    nextSlide,
    prevSlide,
  );

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
        setIsDisabled(false);
      }, 1000);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating) {
      if (currentSlide === 0) {
        setCurrentSlide(totalSlides);
      } else if (currentSlide === totalSlides + 1) {
        setCurrentSlide(1);
      }
    }
  }, [currentSlide, isAnimating, totalSlides]);

  const transitionStyle = useMemo(
    () => ({
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: isAnimating ? 'transform 1s' : 'none',
    }),
    [currentSlide, isAnimating],
  );

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slider__main} ref={sliderRef}>
        <button
          className={styles.slider__button}
          onClick={prevSlide}
          aria-label="Previous Slide"
          disabled={isDisabled}
        >
          <img
            className={styles['slider__button-image']}
            src="/icons/chevron-arrow-left.svg"
            alt="Left arrow icon"
          />
        </button>

        <div className={styles.slider__slides}>
          {extendedSlides.map((slide, index) => (
            <div
              className={styles.slider__slide}
              key={index}
              style={transitionStyle}
            >
              <NavLink to={slide.link} className={styles.slider__link}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={styles.slider__img}
                />
              </NavLink>
            </div>
          ))}
        </div>

        <button
          className={styles.slider__button}
          onClick={nextSlide}
          aria-label="Next Slide"
          disabled={isDisabled}
        >
          <img
            className={styles['slider__button-image']}
            src="/icons/chevron-arrow-right.svg"
            alt="Right arrow icon"
          />
        </button>
      </div>

      <div className={styles.slider__dots}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={classNames(styles['slider__dot-container'], {
              [styles['slider__dot-container--active']]:
                index === currentSlide - 1,
            })}
            onClick={() => goToSlide(index + 1)}
            aria-label={`Slide ${index + 1}`}
          >
            <div
              className={classNames(styles.slider__dot, {
                [styles['slider__dot--active']]: index === currentSlide - 1,
              })}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
