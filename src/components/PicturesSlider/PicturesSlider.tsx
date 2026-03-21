import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import { Link } from 'react-router-dom';

interface BannerSlide {
  id: number;
  image: string;
  link: string;
}

const banners: BannerSlide[] = [
  {
    id: 1,
    image: 'img/banner-phones.png',
    link: '/phones',
  },
  {
    id: 2,
    image: 'img/banner-tablets.png',
    link: '/tablets',
  },
  {
    id: 3,
    image: 'img/banner-accessories.png',
    link: '/accessories',
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const next = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  const prev = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 10000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderContent}>
        <button className={styles.arrowBtn} onClick={prev}>
          <img src="img/icons/Chevron (Arrow Left).svg" alt="Prev" />
        </button>

        <div
          className={styles.window}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndHandler}
        >
          <div
            className={styles.list}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map(banner => (
              <Link to={banner.link} key={banner.id} className={styles.slide}>
                <div className={styles.infoBlock}>
                  <div className={styles.textContent}>
                    <h2 className={styles.title}>
                      Now available
                      <br />
                      in our store!
                    </h2>
                    <p className={styles.subtitle}>Be the first!</p>
                    <span className={styles.orderBtn}>ORDER NOW</span>
                  </div>
                </div>

                <div className={styles.imageBlock}>
                  <img
                    src={banner.image}
                    alt="banner"
                    className={styles.bannerImg}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button className={styles.arrowBtn} onClick={next}>
          <img src="img/icons/Chevron (Arrow Right).svg" alt="Next" />
        </button>
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.dot, {
              [styles.isActive]: currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
