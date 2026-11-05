import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const IMAGE_BANNER = [
  {
    wide: 'img/banner-1.jpg',
    square: 'img/banner-1-mobile.jpg',
    link: '/phones',
  },
  {
    wide: 'img/banner-2.jpg',
    square: 'img/banner-2-mobile.jpg',
    link: '/accessories',
  },
  {
    wide: 'img/banner-3.jpg',
    square: 'img/banner-3-mobile.jpg',
    link: '/phones',
  },
  {
    wide: 'img/banner-4.jpg',
    square: 'img/banner-4-mobile.jpg',
    link: '/tablets',
  },
  {
    wide: 'img/banner-5.jpg',
    square: 'img/banner-5-mobile.jpg',
    link: '/phones',
  },
  {
    wide: 'img/banner-6.jpg',
    square: 'img/banner-6-mobile.jpg',
    link: '/accessories',
  },
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(current => {
        if (current === IMAGE_BANNER.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(IMAGE_BANNER.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === IMAGE_BANNER.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className={styles.picturesSlider}>
      <button
        type="button"
        className={styles.picturesSliderPrev}
        aria-label="Previous slide"
        onClick={handlePrev}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className={styles.picturesSliderWindow}>
        <ul className={styles.picturesSliderTrack}>
          {IMAGE_BANNER.map((image, index) => {
            return (
              <li
                key={image.wide}
                className={classNames(styles.picturesSliderItem, {
                  [styles.picturesSliderItemActive]: index === currentIndex,
                })}
              >
                <Link to={image.link} className={styles.picturesSliderLink}>
                  <picture>
                    <source media="(min-width: 640px)" srcSet={image.wide} />
                    <img
                      src={image.square}
                      alt=""
                      className={styles.picturesSliderImage}
                    />
                  </picture>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        className={styles.picturesSliderNext}
        aria-label="Next slide"
        onClick={handleNext}
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className={styles.picturesSliderDashes}>
        {IMAGE_BANNER.map((image, index) => {
          return (
            <button
              type="button"
              key={image.wide}
              aria-label={`Go to slide ${index + 1}`}
              className={classNames(styles.picturesSliderDash, {
                [styles.picturesSliderDashActive]: index === currentIndex,
              })}
              onClick={() => setCurrentIndex(index)}
            ></button>
          );
        })}
      </div>
    </section>
  );
};
