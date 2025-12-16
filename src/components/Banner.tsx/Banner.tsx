// src/components/Banner/Banner.tsx
import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css';
import ChevronButton from '../ChevronButton/ChevronButton';
import Title from '../Title/Title';
import IndicatorDots from '../IndicatorDots/IndicatorDots';

import bannerImages from '../../data/bannerImages';

export type BannerProps = {
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
  showIndicators?: boolean;
  mobileImages?: string[]; // opcional: imagens mobile na mesma ordem de bannerImages
};

const MOBILE_QUERY = '(max-width: 20rem)'; // 20rem = 320px

const Banner: React.FC<BannerProps> = ({
  title,
  titleLevel,
  children = null,
  className = '',
  'data-testid': dataTestId = 'banner',
  showIndicators = true,
  mobileImages,
}) => {
  const slides = Array.isArray(bannerImages) ? (bannerImages as string[]) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isMobileTiny, setIsMobileTiny] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_QUERY).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (ev: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileTiny(ev.matches);
    };

    setIsMobileTiny(mq.matches);

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler as EventListener);

      return () => mq.removeEventListener('change', handler as EventListener);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(handler as (ev: MediaQueryListEvent) => void);

      return () =>
        mq.removeListener(handler as (ev: MediaQueryListEvent) => void);
    }
  }, []);

  useEffect(() => {
    if (!slides.length) {
      return;
    }

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    if (!slides.length) {
      return;
    }

    setFade(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
      setFade(false);
    }, 500);
  };

  const handleNext = () => {
    if (!slides.length) {
      return;
    }

    setFade(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
      setFade(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    if (!slides.length) {
      return;
    }

    setFade(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(false);
    }, 500);
  };

  const getCurrentImage = () => {
    if (!slides.length) {
      return '';
    }

    if (
      isMobileTiny &&
      Array.isArray(mobileImages) &&
      mobileImages[currentIndex]
    ) {
      return mobileImages[currentIndex];
    }

    return slides[currentIndex];
  };

  const currentImageUrl = getCurrentImage();

  return (
    <section className={styles.containerBlock}>
      <div className={styles.containerTitle}>
        {title ? (
          <Title
            text={title}
            level={titleLevel ?? 1}
            data-testid="banner-title"
          />
        ) : null}
        {children}
      </div>

      <div className={styles.containerFlex}>
        <div className={`${styles.side} ${styles.left}`}>
          <ChevronButton
            direction="left"
            onClick={handlePrev}
            aria-label="Voltar banner"
            data-testid="chevron-left"
          />
        </div>

        <div
          className={`${styles.containerImg} ${className} ${fade ? styles.fade : ''}`.trim()}
          data-testid={dataTestId}
          role="region"
          aria-label="Banner"
          style={{
            backgroundImage: currentImageUrl
              ? `url(${currentImageUrl})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className={`${styles.side} ${styles.right}`}>
          <ChevronButton
            direction="right"
            onClick={handleNext}
            aria-label="Avançar banner"
            data-testid="chevron-right"
          />
        </div>
      </div>

      {showIndicators && (
        <div
          className={styles.indicatorWrapper}
          data-testid="banner-indicators"
        >
          <IndicatorDots
            count={slides.length}
            activeIndex={currentIndex}
            width={14}
            activeWidth={14}
            height={4}
            gap={8}
            activeColor="#000"
            inactiveColor="#ddd"
            onClick={handleDotClick}
          />
        </div>
      )}
    </section>
  );
};

export default Banner;
