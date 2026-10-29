import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BannerSlider.module.scss';

const cx = classNames.bind(styles);

export type BannerSlide = {
  id: string;
  to: string;
  alt: string;
  desktopSrc: string; // tablet + desktop
  mobileSrc: string; // 320–639px
};

type Props = {
  slides: BannerSlide[];
  autoPlayMs?: number;
};

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BannerSlider = ({ slides, autoPlayMs = 5000 }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const next = (index + slides.length) % slides.length;

      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
    },
    [slides.length],
  );

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (isPaused || reduceMotion || slides.length < 2) {
      return;
    }

    const id = window.setInterval(() => goTo(activeIndex + 1), autoPlayMs);

    return () => window.clearInterval(id);
  }, [activeIndex, autoPlayMs, goTo, isPaused, slides.length]);

  return (
    <div
      className={cx('slider')}
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <button
        type="button"
        className={cx('slider__button', 'slider__button--prev')}
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous slide"
      >
        <Chevron direction="left" />
      </button>

      <div
        ref={trackRef}
        className={cx('slider__track')}
        onScroll={handleScroll}
      >
        {slides.map((slide, i) => (
          <Link
            key={slide.id}
            to={slide.to}
            className={cx('slider__slide')}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <picture>
              <source media="(min-width: 640px)" srcSet={slide.desktopSrc} />
              <img
                className={cx('slider__image')}
                src={slide.mobileSrc}
                alt={slide.alt}
                draggable={false}
              />
            </picture>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className={cx('slider__button', 'slider__button--next')}
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next slide"
      >
        <Chevron direction="right" />
      </button>

      <div className={cx('slider__dots')}>
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={cx('slider__dot', {
              'slider__dot--active': i === activeIndex,
            })}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};
