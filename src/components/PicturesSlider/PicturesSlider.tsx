import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';

const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 12L6 8l4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SLIDES = [
  {
    id: 1,
    tag: 'Now available in our store!',
    title: 'iPhone 14 Pro',
    link: '/phones',
    imgBg: 'linear-gradient(180deg, #1e1a3a 0%, #3a2980 100%)',
    emoji: '📱',
  },
  {
    id: 2,
    tag: 'Hot deal — limited offer',
    title: 'iPad Pro M2',
    link: '/tablets',
    imgBg: 'linear-gradient(180deg, #0d2137 0%, #1a3a5c 100%)',
    emoji: '💻',
  },
  {
    id: 3,
    tag: 'Complete your setup',
    title: 'AirPods Pro',
    link: '/accessories',
    imgBg: 'linear-gradient(180deg, #1a0a2e 0%, #4a1070 100%)',
    emoji: '🎧',
  },
];

const INTERVAL_MS = 5000;

export const PicturesSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(
    () => setCurrent(c => (c + 1) % SLIDES.length),
    [],
  );
  const goPrev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(goNext, INTERVAL_MS);

    return () => clearInterval(id);
  }, [goNext]);

  const slide = SLIDES[current];

  return (
    <section className={styles.section}>
      <div className={styles.slideWrap}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <IconChevronLeft />
        </button>

        <div className={styles.slide} key={slide.id}>
          <div className={styles.textSide}>
            <span className={styles.tag}>{slide.tag}</span>
            <h2 className={styles.title}>{slide.title}</h2>
            <Link to={slide.link} className={styles.cta}>
              Order now
            </Link>
          </div>

          <div className={styles.imgSide} style={{ background: slide.imgBg }}>
            <span className={styles.emoji} aria-hidden="true">
              {slide.emoji}
            </span>
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={goNext}
          aria-label="Next slide"
        >
          <IconChevronRight />
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};
