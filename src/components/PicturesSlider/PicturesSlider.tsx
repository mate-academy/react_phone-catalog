import React, { useEffect, useRef, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const banners = [
  {
    title: 'iPhone 17 Series',
    src: '/public/img/iPhone_17.png',
    alt: 'Banner phones',
  },
  {
    title: 'iPad Pro 2025',
    src: '/public/img/banner-tablets.png',
    alt: 'Banner tablets',
  },
  {
    title: 'Accessories for your gadgets',
    src: '/public/img/banner-accessories.png',
    alt: 'Banner accessories',
  },
];

export const PicturesSlider: React.FC = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const bannersCount = banners.length;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % bannersCount);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bannersCount]);

  const goTo = (idx: number) => setActive(idx);
  const prev = () => setActive(a => (a - 1 + bannersCount) % bannersCount);
  const next = () => setActive(a => (a + 1) % bannersCount);

  return (
    <div className={styles.picturesSlider}>
      <div className={styles.picturesSlider__container}>
        <button
          className={`${styles.picturesSlider__button} ${styles.picturesSlider__buttonLeft}`}
          onClick={prev}
          aria-label="Previous banner"
        >
          <img src="public/icons/Chevron (Arrow Left).svg" alt="left" />
        </button>
        <div className={styles.picturesSlider__content}>
          <div className={styles.picturesSlider__left}>
            <h2 className={styles.picturesSlider__leftTitle}>
              Now available <br /> in our store!
              <img
                src="public/icons/hand-ok.svg"
                alt="left"
                className={styles.picturesSlider__leftTitleIconOk}
              />
            </h2>
            <p className={styles.picturesSlider__leftText}>Be the first!</p>
            <Link to="" className={styles.picturesSlider__btn}>
              Order now
            </Link>
          </div>
          <div className={styles.picturesSlider__right}>
            <h3 className={styles.picturesSlider__rightTitle}>
              {banners[active].title}
            </h3>
            <p className={styles.picturesSlider__rightText}>Pro. Beyond.</p>
            <img
              className={styles.picturesSlider__bannerImg}
              src={banners[active].src}
              alt={banners[active].alt}
            />
          </div>
        </div>
        <button
          className={`${styles.picturesSlider__button} ${styles.picturesSlider__buttonRight}`}
          onClick={next}
          aria-label="Next banner"
        >
          <img src="public/icons/Chevron (Arrow Right).svg" alt="right" />
        </button>
      </div>
      <div className={styles.picturesSlider__dots}>
        {banners.map((_, i) => (
          <button
            key={i}
            className={classNames(styles.picturesSlider__dot, {
              [styles['picturesSlider__dot--active']]: i === active,
            })}
            onClick={() => goTo(i)}
            aria-label={`Go to banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
