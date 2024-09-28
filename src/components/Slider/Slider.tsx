import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useAppSelector } from '../../hooks';

import { Slide } from '../Slide/Slide';
import { Dots } from '../Dots';
import { SliderButton } from '../SliderButton';

import styles from './Slider.module.scss';
const {
  slider,
  slider__content,
  slider__carousel,
  slider__carouselWrapper,
  slider__slide,
  slider__nav,
} = styles;

export const Slider = () => {
  const { slides, interval } = useAppSelector((state) => state.slider);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  /*
   * Adding fake slides on the start and at the end of slides array to create an endless effect
   */
  const extendedSlides = useMemo(() => {
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  const handleSlideChange = useCallback((newIndex: number) => {
    setIsAnimating(true);

    if (newIndex >= extendedSlides.length || newIndex < 0) {
      setCurrentIndex(4);

      return;
    }

    setCurrentIndex(newIndex);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);

    if (currentIndex === 0) {
      setCurrentIndex(slides.length);
    } else if (currentIndex === slides.length + 1) {
      setCurrentIndex(1);
    }
  }, [currentIndex, slides.length]);

  const handleNextSlide = useCallback(() => {
    handleSlideChange(currentIndex + 1);
  }, [currentIndex, handleSlideChange]);

  const handlePrevSlide = useCallback(() => {
    handleSlideChange(currentIndex - 1);
  }, [currentIndex, handleSlideChange]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(handleNextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, handleNextSlide, interval]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextSlide,
    onSwipedRight: handlePrevSlide,
  });

  const ANIMATION_DURATION = 1000;

  return (
    <div
      className={slider}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      {...swipeHandlers}
    >
      <div className={slider__content}>
        <SliderButton direction="left" onClick={handlePrevSlide} />

        <div className={slider__carouselWrapper}>
          <div
            className={slider__carousel}
            style={{
              transition: isAnimating
                ? `transform ${ANIMATION_DURATION}ms`
                : 'none',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, index) => (
              <div key={`${slide.id}-${index}`} className={slider__slide}>
                <Slide image={slide.image} id={slide.id} link={slide.link} />
              </div>
            ))}
          </div>
        </div>

        <SliderButton direction="right" onClick={handleNextSlide} />
      </div>

      <div className={slider__nav}>
        <Dots
          count={slides.length}
          activeIndex={(currentIndex - 1 + slides.length) % slides.length}
          onClick={(index) => handleSlideChange(index + 1)}
        />
      </div>
    </div>
  );
};
