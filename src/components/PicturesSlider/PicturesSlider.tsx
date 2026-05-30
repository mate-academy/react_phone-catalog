import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const SLIDES = [
  {
    title: 'iPhone 14 Pro',
    subtitle: 'Pro. Beyond.',
    image: 'img/phones/apple-iphone-14-pro/spaceblack/00.webp',
  },
  {
    title: 'iPhone 13 Pro',
    subtitle: 'Modern performance, sleek design.',
    image: 'img/phones/apple-iphone-13-pro-max/gold/00.webp',
  },
  {
    title: 'iPhone 11',
    subtitle: 'Classic design, premium value.',
    image: 'img/phones/apple-iphone-11/black/00.webp',
  },
];

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = SLIDES[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % SLIDES.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const handleSelect = (index: number) => setActiveIndex(index);

  return (
    <section className={styles.slider}>
      <div className={styles.slide}>
        <div className={styles.leftCard}>
          <p className={styles.topText}>Now available in our store! 👌</p>
          <h3 className={styles.title}>{slide.title}</h3>
          <p className={styles.description}>{slide.subtitle}</p>
          <button type="button" className={styles.orderButton}>
            Order now
          </button>
        </div>
        <div className={styles.imageCard}>
          <img src={slide.image} alt={slide.title} />
        </div>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() =>
            handleSelect((activeIndex - 1 + SLIDES.length) % SLIDES.length)
          }
          aria-label="Previous slide"
        >
          <span className="fa fa-chevron-left" />
        </button>
        <button
          type="button"
          onClick={() => handleSelect((activeIndex + 1) % SLIDES.length)}
          aria-label="Next slide"
        >
          <span className="fa fa-chevron-right" />
        </button>
      </div>
      <div className={styles.dots}>
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={classNames(styles.dot, {
              [styles.active]: activeIndex === index,
            })}
            onClick={() => handleSelect(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
