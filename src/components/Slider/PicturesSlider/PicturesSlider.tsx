import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Navigation } from '../Navigation';
import { Pagination } from '../Pagination';

import { PictureSlide } from './PictureSlide';

import styles from './PicturesSlider.module.scss';

const AUTOPLAY_DELAY = 5000;

type Props = {
  slides: PictureSlide[];
};

export const PicturesSlider: React.FC<Props> = ({ slides }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;
  const extended = total ? [slides[total - 1], ...slides, slides[0]] : [];

  const scrollToRaw = (raw: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;

    track?.scrollTo({ left: raw * track.clientWidth, behavior });
  };

  useLayoutEffect(() => {
    scrollToRaw(1, 'instant');
  }, [total]);

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track?.clientWidth) {
      return;
    }

    const raw = Math.round(track.scrollLeft / track.clientWidth);

    setActiveIndex((raw - 1 + total) % total);
  };

  const goToSlide = (index: number) => scrollToRaw(index + 1);

  const handlePrev = () => scrollToRaw(activeIndex);

  const handleNext = () => scrollToRaw(activeIndex + 2);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const handleScrollEnd = () => {
      const raw = Math.round(track.scrollLeft / track.clientWidth);

      if (raw === 0) {
        track.scrollTo({
          left: total * track.clientWidth,
          behavior: 'instant',
        });
      } else if (raw === total + 1) {
        track.scrollTo({ left: track.clientWidth, behavior: 'instant' });
      }
    };

    track.addEventListener('scrollend', handleScrollEnd);

    return () => track.removeEventListener('scrollend', handleScrollEnd);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || isPaused) {
      return;
    }

    const timerId = setInterval(handleNext, AUTOPLAY_DELAY);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, total, isPaused]);

  return (
    <section
      className={styles['pictures-slider']}
      aria-roledescription="carousel"
      aria-label="carousel products"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles['pictures-slider__content']}>
        <Navigation
          hiddenButton="next"
          onClickPrev={handlePrev}
          customClassName={'navigation__button-custom'}
        />

        <Link
          to={slides[activeIndex].path}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles['pictures-slider__link']}
        >
          Order now
        </Link>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className={styles['pictures-slider__track']}
        >
          {extended.map((slide, index) => (
            <div
              key={`${index}-${slide.id}`}
              className={styles['pictures-slider__slide']}
              role="group"
              aria-roledescription="slide"
              aria-label={`${((index - 1 + total) % total) + 1} of ${total}`}
              aria-hidden={index === 0 || index === extended.length - 1}
            >
              <img
                className={styles['pictures-slider__image']}
                src={`${import.meta.env.BASE_URL}/${slide.src}`}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>

        <Navigation
          hiddenButton="prev"
          onClickNext={handleNext}
          customClassName={'navigation__button-custom'}
        />
      </div>

      <Pagination
        total={total}
        activeIndex={activeIndex}
        onChange={goToSlide}
      />
    </section>
  );
};
