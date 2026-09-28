import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { getAssetUrl } from '../../../shared/utils/assets';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    image: 'img/banner-phones.png',
    title: 'Now available in our store',
    subtitle: 'The newest phones are waiting for you.',
  },
  {
    image: 'img/banner-tablets.png',
    title: 'Work and play on a bigger screen',
    subtitle: 'Discover tablets for every day.',
  },
  {
    image: 'img/banner-accessories.png',
    title: 'Accessories that complete the setup',
    subtitle: 'Smart watches and extras in one catalog.',
  },
];

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex(currentIndex => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const setNextSlide = () => {
    setActiveIndex(currentIndex => (currentIndex + 1) % slides.length);
  };

  const setPreviousSlide = () => {
    setActiveIndex(currentIndex => {
      return currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    });
  };

  return (
    <section className={styles.wrapper} aria-label="Featured products">
      <div className={styles.row}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Previous slide"
          onClick={setPreviousSlide}
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <div className={styles.viewport}>
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={classNames(styles.slide, {
                [styles.slideActive]: index === activeIndex,
              })}
            >
              <div className={styles.copy}>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>

              <img src={getAssetUrl(slide.image)} alt="" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="Next slide"
          onClick={setNextSlide}
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={classNames(styles.dot, {
              [styles.dotActive]: index === activeIndex,
            })}
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
