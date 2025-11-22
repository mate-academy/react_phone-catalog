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
};

const Banner: React.FC<BannerProps> = ({
  title,
  titleLevel,
  children = null,
  className = '',
  'data-testid': dataTestId = 'banner',
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // autoplay a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % bannerImages.length);
        setFade(false);
      }, 500); // tempo do fade
    }, 5000); // intervalo de troca

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(
        prev => (prev - 1 + bannerImages.length) % bannerImages.length,
      );
      setFade(false);
    }, 500);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % bannerImages.length);
      setFade(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(false);
    }, 500);
  };

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
          style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
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
            count={bannerImages.length}
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
