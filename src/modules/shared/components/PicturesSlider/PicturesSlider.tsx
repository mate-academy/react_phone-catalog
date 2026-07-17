import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    id: 1,
    image: 'img/banner-phones.png',
    alt: 'Phones banner',
  },
  {
    id: 2,
    image: 'img/banner-tablets.png',
    alt: 'Tablets banner',
  },
  {
    id: 3,
    image: 'img/banner-accessories.png',
    alt: 'Accessories banner',
  },
];

export const PicturesSlider = () => {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex(current => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [index]);

  return (
    <section className={styles.slider}>
      <div className={styles.frame}>
        <button
          type="button"
          className={styles.navButton}
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          <Icon name="arrow-left" />
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map(slide => (
              <div key={slide.id} className={styles.slide}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.navButton}
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          <Icon name="arrow-right" />
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={classNames(styles.dot, {
              [styles.dotActive]: i === index,
            })}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};
