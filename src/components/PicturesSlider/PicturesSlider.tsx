import React from 'react';
import styles from './PicturesSlider.module.scss';
import { Link } from 'react-router-dom';
import { ChevronArrowLeft, ChevronArrowRight } from '../../helpers/icons';
import classNames from 'classnames';

const images = [
  {
    url: '/phones',
    image: './img/banner-phones.png',
    alt: 'Banner: phones image',
  },
  {
    url: '/tablets',
    image: './img/banner-tablets.png',
    alt: 'Banner: tablets image',
  },
  {
    url: '/accessories',
    image: './img/banner-accessories.png',
    alt: 'Banner: accessories image',
  },
];

const STEP = 1;
const FRAME_SIZE = 1;
const TRANSLATE_X_PERCENT = 100;
const CHANGE_IMAGE_DELAY = 5000;

export const PicturesSlider: React.FC = () => {
  const [slide, setSlide] = React.useState(0);

  const startSlide = React.useMemo(() => images.length - FRAME_SIZE, []);

  const imageStyle = React.useMemo(
    () => ({
      transform: `translateX(-${slide * TRANSLATE_X_PERCENT}%)`,
    }),
    [slide],
  );

  const handleNextClick = React.useCallback(() => {
    setSlide(currentSlide => {
      if (currentSlide !== startSlide) {
        return Math.min(currentSlide + STEP, startSlide);
      }

      return 0;
    });
  }, [startSlide]);

  const handlePreviousClick = React.useCallback(() => {
    setSlide(currentSlide => {
      if (currentSlide > 0) {
        return Math.max(currentSlide - STEP, 0);
      }

      return startSlide;
    });
  }, [startSlide]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, CHANGE_IMAGE_DELAY);

    return () => clearInterval(intervalId);
  }, [handleNextClick]);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={handlePreviousClick}
        >
          <ChevronArrowLeft />
        </button>

        <div className={styles.imagesWrapper}>
          {images.map(item => (
            <Link to={item.url} className={styles.link} key={item.url}>
              <img
                src={item.image}
                alt={item.alt}
                className={styles.image}
                style={imageStyle}
              />
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={handleNextClick}
        >
          <ChevronArrowRight />
        </button>
      </div>

      <div className={styles.dotsWrapper}>
        {images.map((item, index) => (
          <button
            type="button"
            className={classNames(
              styles.dot,
              slide === index ? styles.activeDot : '',
            )}
            key={item.url}
            onClick={() => setSlide(index)}
          >
            <span></span>
          </button>
        ))}
      </div>
    </section>
  );
};
