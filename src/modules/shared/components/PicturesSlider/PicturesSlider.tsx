import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BANNER_SLIDES } from '../../constants/catalog';
import styles from './PicturesSlider.module.scss';

const SLIDE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % BANNER_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleStep = (direction: 'prev' | 'next') => {
    setActiveIndex(current =>
      direction === 'prev'
        ? (current - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length
        : (current + 1) % BANNER_SLIDES.length,
    );
  };

  return (
    <section className={styles.slider}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => handleStep('prev')}
        >
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => handleStep('next')}
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>

      <div className={styles.viewport}>
        {BANNER_SLIDES.map((slide, index) => (
          <article
            key={slide.title}
            className={classNames(styles.slide, {
              [styles.slideActive]: index === activeIndex,
            })}
          >
            <div className={styles.content}>
              <p className={styles.eyebrow}>{slide.eyebrow}</p>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.description}>{slide.description}</p>
              <Link to={slide.cta} className={styles.cta}>
                Start browsing
              </Link>
            </div>

            <Link to={slide.cta} className={styles.imageLink}>
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.image}
              />
            </Link>
          </article>
        ))}
      </div>

      <div className={styles.dots}>
        {BANNER_SLIDES.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={classNames(styles.dot, {
              [styles.dotActive]: index === activeIndex,
            })}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
