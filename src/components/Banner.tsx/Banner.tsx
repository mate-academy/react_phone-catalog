// src/components/Banner/Banner.tsx
import React from 'react';
import styles from './Banner.module.css';
import ChevronButton from '../ChevronButton/ChevronButton';
import Title from '../Title/Title';
import IndicatorDots from '../IndicatorDots/IndicatorDots';

export type BannerProps = {
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  showIndicators?: boolean;
  indicatorCount?: number;
  indicatorIndex?: number;
  indicatorWidth?: number;
  indicatorActiveWidth?: number;
  indicatorHeight?: number;
  indicatorGap?: number;
  indicatorActiveColor?: string;
  indicatorInactiveColor?: string;
};

const Banner: React.FC<BannerProps> = ({
  title,
  titleLevel,
  children = null,
  className = '',
  'data-testid': dataTestId = 'banner',
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  showIndicators = true,
  indicatorCount = 3,
  indicatorIndex = 0,
  indicatorWidth = 14,
  indicatorActiveWidth = 14,
  indicatorHeight = 4,
  indicatorGap = 8,
  indicatorActiveColor = '#000',
  indicatorInactiveColor = '#ddd',
}) => {
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
            onClick={onPrev}
            aria-label="Voltar banner"
            data-testid="chevron-left"
            disabled={prevDisabled}
          />
        </div>

        <div
          className={`${styles.containerImg} ${className}`.trim()}
          data-testid={dataTestId}
          role="region"
          aria-label="Banner"
        />

        <div className={`${styles.side} ${styles.right}`}>
          <ChevronButton
            direction="right"
            onClick={onNext}
            aria-label="Avançar banner"
            data-testid="chevron-right"
            disabled={nextDisabled}
          />
        </div>
      </div>

      {showIndicators && (
        <div
          className={styles.indicatorWrapper}
          data-testid="banner-indicators"
        >
          <IndicatorDots
            count={indicatorCount}
            activeIndex={indicatorIndex}
            width={indicatorWidth}
            activeWidth={indicatorActiveWidth}
            height={indicatorHeight}
            gap={indicatorGap}
            activeColor={indicatorActiveColor}
            inactiveColor={indicatorInactiveColor}
          />
        </div>
      )}
    </section>
  );
};

export default Banner;
