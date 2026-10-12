import { useState, useEffect } from 'react';

import arrowUp from '@/assets/icons/arrow-up.svg';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

import styles from './Banner.module.scss';

type Slide = {
  id: string;
  image: string;
};

type BannerProps = {
  slides: Slide[];
  intervalMs?: number;
};

export const Banner = ({ slides, intervalMs = 5000 }: BannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timerId = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timerId);
  }, [slides.length, intervalMs]);

  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <Button
        className={styles.button}
        onClick={() =>
          setActiveIndex(prev => (prev - 1 + slides.length) % slides.length)
        }
        aria-label="Previous picture"
      >
        <img className={styles.img__prev} src={arrowUp} alt="" />
      </Button>
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(styles.slide, {
              [styles.active]: index === activeIndex,
            })}
            aria-hidden={index !== activeIndex}
          >
            <img className={styles.image} src={slide.image} alt="" />
          </div>
        ))}
      </div>
      <Button
        className={styles.button}
        onClick={() => setActiveIndex(prev => (prev + 1) % slides.length)}
        aria-label="Next picture"
      >
        <img className={styles.img__next} src={arrowUp} alt="" />
      </Button>

      <div className={styles.indicators}>
        {slides.map((slide, index) => (
          <Button
            key={slide.id}
            type="button"
            className={cn(styles.indicator, {
              [styles['indicator-active']]: index === activeIndex,
            })}
            onClick={() => setActiveIndex(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
