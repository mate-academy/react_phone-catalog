import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Banner.module.scss';

const SLIDES = [
  {
    id: 'phones',
    title: 'Now available in our store!',
    subtitle: 'iPhone 14 Pro',
    image: 'img/banner-phones.png',
    bg: '#161827',
  },
  {
    id: 'tablets',
    title: 'New iPad Pro',
    subtitle: 'Supercharged by M2 chip',
    image: 'img/banner-tablets.png',
    bg: '#6d6474',
  },
  {
    id: 'accessories',
    title: 'Apple Watch Series 9',
    subtitle: 'Best way to connect with Apple',
    image: 'img/banner-accessories.png',
    bg: '#c6a285',
  },
];

export const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoPlayInterval = 5000;
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
    }

    autoplayRef.current = window.setInterval(() => {
      setActiveSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);
  }, [autoPlayInterval]);

  const handlePrev = () =>
    setActiveSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  const handleNext = () =>
    setActiveSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));

  return (
    <section className={styles.banner}>
      <button
        type="button"
        className={cn(styles.arrow, styles.arrowLeft)}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left" />
      </button>

      <div className={styles.slider}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(styles.slide, {
              [styles.slideActive]: index === activeSlide,
            })}
            style={{ backgroundColor: slide.bg }}
          >
            <div className={styles.content}>
              <p className={styles.title}>{slide.title} 🔥</p>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <button type="button" className={styles.orderBtn}>
                Order now
              </button>
            </div>
            <img
              src={slide.image}
              alt={slide.subtitle}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={cn(styles.arrow, styles.arrowRight)}
        onClick={handleNext}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right" />
      </button>

      <div className={styles.dots}>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={cn(styles.dot, {
              [styles.dotActive]: index === activeSlide,
            })}
            onClick={() => setActiveSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
