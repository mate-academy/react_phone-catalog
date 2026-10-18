import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './PicturesSlider.module.scss';

const SLIDE_DELAY = 5000;

const SLIDES = [
  { image: 'img/banner-phones.png', title: 'Phones', to: '/phones' },
  { image: 'img/banner-tablets.png', title: 'Tablets', to: '/tablets' },
  {
    image: 'img/banner-accessories.png',
    title: 'Accessories',
    to: '/accessories',
  },
];

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showNext = () => setActiveIndex(index => (index + 1) % SLIDES.length);
  const showPrevious = () =>
    setActiveIndex(index => (index - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timerId = setTimeout(showNext, SLIDE_DELAY);

    return () => clearTimeout(timerId);
  }, [activeIndex]);

  return (
    <section className={styles['pictures-slider']}>
      <div className={styles['pictures-slider__body']}>
        <button
          type="button"
          className={styles['pictures-slider__button']}
          aria-label="Previous picture"
          onClick={showPrevious}
        >
          <Icon name="arrow-left" />
        </button>

        <div className={styles['pictures-slider__viewport']}>
          <ul
            className={styles['pictures-slider__track']}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map(({ image, title, to }) => (
              <li key={to} className={styles['pictures-slider__slide']}>
                <Link to={to}>
                  <img
                    src={image}
                    alt={title}
                    className={styles['pictures-slider__image']}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={styles['pictures-slider__button']}
          aria-label="Next picture"
          onClick={showNext}
        >
          <Icon name="arrow-right" />
        </button>
      </div>

      <div className={styles['pictures-slider__dashes']}>
        {SLIDES.map(({ to, title }, index) => (
          <button
            key={to}
            type="button"
            className={classNames(styles['pictures-slider__dash'], {
              [styles['pictures-slider__dash--active']]: index === activeIndex,
            })}
            aria-label={`Show ${title} picture`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
