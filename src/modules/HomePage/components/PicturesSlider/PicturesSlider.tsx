import React, { useEffect, useRef, useState } from 'react';
import { SliderButton } from '../../../../components/SheredNavigation';

import { SliderImage } from './components/SliderImage';
import { SliderDots } from './components/SliderDots';
import styles from './PicturesSlider.module.scss';

const images = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export const PicturesSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide();
  }, []);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <div
          className={styles.sliderWrapper}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <SliderButton direction="left" onClick={handlePrev} variant="tall" />

          <div className={styles.imageWrapper}>
            <SliderImage
              src={images[activeIndex]}
              alt={`Slide ${activeIndex + 1}`}
            />
          </div>

          <div className={styles.dots}>
            <SliderDots
              total={images.length}
              activeIndex={activeIndex}
              onDotClick={goToSlide}
            />
          </div>

          <SliderButton direction="right" onClick={handleNext} variant="tall" />
        </div>
      </div>
    </section>
  );
};
