import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { getImageUrl } from '@/utils/getImageUrl';
import { useInterval } from '../../hooks/useInterval';
import styles from './PicturesSlider.module.scss';

const SLIDE_DURATION = 5000;

type Slide = {
  title: string;
  subtitle: string;
  cta: string;
  to: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    cta: 'Order now',
    to: '/phones',
    image: 'img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    alt: 'Apple iPhone 14 Pro',
  },
  {
    title: 'Explore the new iPad Pro',
    subtitle: 'Power beyond limits.',
    cta: 'Shop tablets',
    to: '/tablets',
    image: 'img/tablets/apple-ipad-pro-11-2021/spacegray/00.webp',
    alt: 'Apple iPad Pro',
  },
  {
    title: 'Meet the Apple Watch',
    subtitle: 'Stay connected on the go.',
    cta: 'Shop accessories',
    to: '/accessories',
    image: 'img/accessories/apple-watch-series-6/space-gray/00.webp',
    alt: 'Apple Watch Series 6',
  },
];

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const goToNext = () => {
    setActiveIndex(current => (current + 1) % slides.length);
  };

  const goToPrevious = () => {
    setActiveIndex(current => (current - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    goToNext();
    setResetKey(key => key + 1);
  };

  const handlePreviousClick = () => {
    goToPrevious();
    setResetKey(key => key + 1);
  };

  useInterval(goToNext, SLIDE_DURATION, resetKey);

  return (
    <div className={styles.slider}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.arrowLeft}
          aria-label="Previous slide"
          onClick={handlePreviousClick}
        >
          <Icon name="chevron-left" />
        </button>

        <div className={styles.track}>
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={styles.slide}
              style={{
                transform: `translateX(${(index - activeIndex) * 100}%)`,
              }}
            >
              <div className={styles.card}>
                <h3 className={styles.title}>{slide.title}</h3>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <Link to={slide.to} className={styles.button}>
                  {slide.cta}
                </Link>
              </div>

              <img
                src={getImageUrl(slide.image)}
                alt={slide.alt}
                className={styles.image}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.arrowRight}
          aria-label="Next slide"
          onClick={handleNextClick}
        >
          <Icon name="chevron-right" />
        </button>
      </div>

      <div className={styles.dashes}>
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeIndex}
            className={[
              styles.dash,
              index === activeIndex ? styles.dashActive : '',
            ].join(' ')}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
