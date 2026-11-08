import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg?react';
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg?react';
import styles from './PicturesSlider.module.scss';

const AUTOPLAY_DELAY = 5000;

const BANNERS = [
  {
    src: 'img/banner-phones.png',
    alt: 'iPhone 11 in six colors',
    to: '/phones',
  },
  {
    src: 'img/banner-tablets.png',
    alt: 'iPad models side by side',
    to: '/tablets',
  },
  {
    src: 'img/banner-accessories.png',
    alt: 'iPhone cases and MagSafe accessories',
    to: '/accessories',
  },
];

interface Props {
  className?: string;
}

export const PicturesSlider = ({ className }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const lastIndex = BANNERS.length - 1;
    let target = index;

    if (index > lastIndex) {
      target = 0;
    } else if (index < 0) {
      target = lastIndex;
    }

    list.scrollTo({ left: target * list.clientWidth, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(
      () => goTo(activeIndex + 1),
      AUTOPLAY_DELAY,
    );

    return () => {
      window.clearTimeout(timerId);
    };
  }, [activeIndex, goTo]);

  const handleScroll = () => {
    const list = listRef.current;

    if (list) {
      setActiveIndex(Math.round(list.scrollLeft / list.clientWidth));
    }
  };

  return (
    <section
      className={classNames(styles.slider, className)}
      aria-label="Featured products"
    >
      <div className={styles.viewport}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous slide"
        >
          <ArrowLeftIcon />
        </button>

        <ul ref={listRef} className={styles.list} onScroll={handleScroll}>
          {BANNERS.map(banner => (
            <li key={banner.src} className={styles.slide}>
              <Link to={banner.to} className={styles.link}>
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className={styles.image}
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next slide"
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className={styles.dots}>
        {BANNERS.map((banner, index) => (
          <button
            key={banner.src}
            type="button"
            className={classNames(styles.dot, {
              [styles.dotActive]: index === activeIndex,
            })}
            onClick={() => goTo(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </section>
  );
};
