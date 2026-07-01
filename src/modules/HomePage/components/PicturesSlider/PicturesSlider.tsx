import { useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../../shared/ui/Icons/Icons';
import styles from './PicturesSlider.module.scss';

export type SlideItem = {
  image: string;
  tabletImage?: string;
  desktopImage?: string;
  objectPosition?: string;
  tabletObjectPosition?: string;
  gradient?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  alt: string;
  link?: string;
};

type Props = {
  items: SlideItem[];
  interval?: number;
};

const SWIPE_THRESHOLD = 50;

export const PicturesSlider = ({ items, interval = 5000 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const goTo = (index: number) => {
    setCurrentIndex(((index % items.length) + items.length) % items.length);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (event: TouchEvent) => {
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      goTo(currentIndex - 1);
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      goTo(currentIndex + 1);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const current = items[currentIndex];

  const imageStyle = {
    '--slide-object-position': current.objectPosition || 'center',
    '--slide-tablet-object-position':
      current.tabletObjectPosition || current.objectPosition || 'center',
    '--slide-gradient':
      current.gradient ||
      'linear-gradient(125deg, rgb(238 244 255 / 90%) 0%, ' +
        'rgb(204 222 255 / 78%) 42%, ' +
        'rgb(160 188 238 / 64%) 100%)',
  } as CSSProperties;

  const image = (
    <picture>
      {current.desktopImage && (
        <source media="(min-width: 1200px)" srcSet={current.desktopImage} />
      )}

      {current.tabletImage && (
        <source media="(min-width: 640px)" srcSet={current.tabletImage} />
      )}

      <img src={current.image} alt={current.alt} className={styles.image} />
    </picture>
  );

  const slideContent = (
    <>
      <div className={styles.slideMedia}>{image}</div>

      <div className={styles.slideContent}>
        {current.badge && <p className={styles.badge}>{current.badge}</p>}
        {current.title && <h2 className={styles.title}>{current.title}</h2>}
        {current.subtitle && (
          <p className={styles.subtitle}>{current.subtitle}</p>
        )}
      </div>
    </>
  );

  return (
    <section className={styles.slider} aria-label="Main banner">
      <div className={styles.track}>
        <button
          type="button"
          className={cn(styles.arrow, styles.arrowLeft)}
          onClick={() => goTo(currentIndex - 1)}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon />
        </button>

        <div
          className={styles.viewport}
          style={imageStyle}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {current.link ? (
            <Link to={current.link} className={styles.slideLink}>
              {slideContent}
            </Link>
          ) : (
            <div className={styles.slide}>{slideContent}</div>
          )}
        </div>

        <button
          type="button"
          className={cn(styles.arrow, styles.arrowRight)}
          onClick={() => goTo(currentIndex + 1)}
          aria-label="Next slide"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className={styles.dots}>
        {items.map((item, index) => (
          <button
            key={item.image}
            type="button"
            className={cn(styles.dot, {
              [styles.dotActive]: index === currentIndex,
            })}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
