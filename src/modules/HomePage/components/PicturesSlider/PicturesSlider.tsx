import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import breakpoints from '@/styles/breakpoints.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    imgMobile: 'img/banners/banner-iphone-14-pro-mobile.png',
    imgDesktop: 'img/banners/banner-iphone-14-pro-desktop.png',
    title: 'iPhone 14 Pro',
    badge: 'Now available\n in our store!',
    descr: 'Pro. Beyond.',
    desktopInfo: 'Grab yours today',
    productLink: '/phones/apple-iphone-14-pro-512gb-spaceblack',
  },
  {
    imgMobile: 'img/banners/banner-apple-watch-series-6-mobile.png',
    imgDesktop: 'img/banners/banner-apple-watch-series-6-desktop.png',
    title: 'Apple Watch Series 6',
    badge: 'Fresh tech\n just arrived!',
    descr: 'The future of health.',
    desktopInfo: 'Stay ahead of time',
    productLink: '/accessories/apple-watch-series-6-44mm-blue',
  },
  {
    imgMobile: 'img/banners/banner-ipad-pro-mobile.png',
    imgDesktop: 'img/banners/banner-ipad-pro-desktop.png',
    title: 'iPad Pro',
    badge: 'Top choice\n for creators!',
    descr: 'Mind-blowing power.',
    desktopInfo: 'Your new canvas awaits',
    productLink: '/tablets/apple-ipad-pro-11-2021-512gb-silver',
  },
];

const SWIPE_THRESHOLD = 100;
const SWIPE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isAnimating = useRef(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = () => {
    if (isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    setActiveIndex(currentIndex => (currentIndex + 1) % slides.length);
  };

  const back = () => {
    if (isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    setActiveIndex(
      currentIndex => (currentIndex - 1 + slides.length) % slides.length,
    );
  };

  const handleControlClick = (index: number) => {
    if (isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    setActiveIndex(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);

    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(false);

    touchEndX.current = event.changedTouches[0].clientX;

    const diffX = touchStartX.current - touchEndX.current;

    if (diffX >= SWIPE_THRESHOLD) {
      next();
    }

    if (diffX <= -SWIPE_THRESHOLD) {
      back();
    }
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const autoSwipeInterval = setInterval(() => next(), SWIPE_INTERVAL);

    return () => {
      clearInterval(autoSwipeInterval);
    };
  }, [isPaused, activeIndex]);

  return (
    <div className={styles.picturesSlider}>
      <div className={styles.container}>
        <button
          className={classNames(styles.sliderButton, styles.left)}
          onClick={() => back()}
        >
          <span className={styles.sliderButtonIcon} />
        </button>

        <div
          className={styles.content}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.imgMobile}
              className={classNames(styles.slide, {
                [styles.active]: index === activeIndex,
              })}
              onTransitionEnd={() => (isAnimating.current = false)}
            >
              <div className={styles.desktopInfoContainer}>
                <div className={styles.desktopInfo}>
                  <p className={styles.badge}>{slide.badge}</p>
                  <p className={styles.infoText}>{slide.desktopInfo}</p>
                  <Link to={slide.productLink} className={styles.infoButton}>
                    <span className={styles.infoButtonText}>Order now</span>
                  </Link>
                </div>
              </div>

              <div className={styles.imgContainer}>
                <picture className={styles.pictureContainer}>
                  <source
                    media={`(min-width: ${breakpoints.screenM})`}
                    srcSet={slide.imgDesktop}
                  />
                  <img
                    src={slide.imgMobile}
                    alt={slide.title}
                    className={styles.slideImg}
                  />
                </picture>

                <div className={styles.slideText}>
                  <p className={styles.badge}>{slide.badge}</p>
                  <h2 className={styles.title}>{slide.title}</h2>
                  <p className={styles.descr}>{slide.descr}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={classNames(styles.sliderButton, styles.right)}
          onClick={() => next()}
        >
          <span className={styles.sliderButtonIcon} />
        </button>
      </div>

      <div className={styles.controls}>
        {slides.map((slide, index) => (
          <span
            key={slide.imgMobile}
            className={classNames(styles.control, {
              [styles.active]: index === activeIndex,
            })}
            onClick={() => handleControlClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
