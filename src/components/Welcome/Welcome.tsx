// src/components/Welcome/Welcome.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './Welcome.module.scss';

import bannerImg1 from './../../img/images/banner1.png';
import bannerImg2 from './../../img/images/banner2.jpg';
import bannerImg3 from './../../img/images/banner3.jpg';
import arrowLeft from './../../img/icons/Chevron Arrow Left.svg';
import arrowRight from './../../img/icons/Chevron Arrow Right.svg';
import dotDefault from './../../img/icons/dots.svg';
import dotActive from './../../img/icons/dotActive.svg';

const DOTS: { default: string; active: string }[] = [
  { default: dotDefault, active: dotActive },
  { default: dotDefault, active: dotActive },
  { default: dotDefault, active: dotActive },
];

const BANNERS: string[] = [bannerImg1, bannerImg2, bannerImg3];

export const Welcome: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const stopAuto = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    timerRef.current = window.setInterval(() => {
      setIndex(prev => (BANNERS.length ? (prev + 1) % BANNERS.length : 0));
    }, 5000);
  };

  const restartAuto = () => {
    stopAuto();
    timerRef.current = window.setTimeout(() => {
      if (mountedRef.current) {
        startAuto();
      }
    }, 500) as unknown as number;
  };

  const prev = () => {
    if (!BANNERS.length) {
      return;
    }

    setIndex(i => (i - 1 + BANNERS.length) % BANNERS.length);
    restartAuto();
  };

  const next = () => {
    if (!BANNERS.length) {
      return;
    }

    setIndex(i => (i + 1) % BANNERS.length);
    restartAuto();
  };

  const goTo = (i: number) => {
    if (!BANNERS.length) {
      return;
    }

    setIndex(i % BANNERS.length);
    restartAuto();
  };

  useEffect(() => {
    mountedRef.current = true;
    startAuto();

    return () => {
      mountedRef.current = false;
      stopAuto();
    };
  }, []);

  if (!BANNERS.length) {
    return null;
  }

  return (
    <section className={styles.welcome}>
      <div className="container">
        <h1 className={styles.welcomeTitle}>Welcome to Nice Gadgets store!</h1>
      </div>
      <div
        className={styles.welcomeBanner}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        <button
          type="button"
          aria-label="Previous slide"
          className={`${styles.arrowGrid} ${styles.arrowLeft}`}
          onClick={prev}
        >
          <img src={arrowLeft} alt="" className={styles.arrowImg} />
        </button>

        <div className={styles.bannerWrapper}>
          {BANNERS.map((banner, i) => (
            <img
              key={i}
              src={banner}
              alt={`banner ${i + 1}`}
              className={`${styles.bannerGrid} ${i === index ? styles.active : ''}`}
              draggable={false}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          className={`${styles.arrowGrid} ${styles.arrowRight}`}
          onClick={next}
        >
          <img src={arrowRight} alt="" className={styles.arrowImg} />
        </button>

        <div className={styles.dots}>
          {DOTS.map((dot, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={styles.dot}
              onClick={() => goTo(i)}
            >
              <img src={i === index ? dot.active : dot.default} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
