import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';
import { useEffect, useState, TouchEvent } from 'react';

const banners = [
  {
    id: 1,
    title: 'iPhone 14 Pro',
    subtitle: 'Pro. Beyond.',
    img: './img/iphone-14-pro-banner.jpg',
    link: '/phones/apple-iphone-14-pro-512gb-spaceblack',
  },
  {
    id: 2,
    title: 'iPad Pro 11',
    subtitle: 'Light. Bright.',
    img: './img/iPad-banner.webp',
    link: '/tablets/apple-ipad-pro-11-2021-1tb-spacegray',
  },
  {
    id: 3,
    title: 'Apple Watch',
    subtitle: 'Ready. Action.',
    img: 'img/accessories/apple-watch-series-3/space-gray/00.webp',
    link: '/accessories/apple-watch-series-3-38mm-space-gray',
  },
];

export const SlideBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 25;

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (event: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event: TouchEvent) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }

    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentBanner = banners[currentIndex];

  return (
    <div
      className={styles.slideBanner}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.slideBanner__buttons} onClick={prevSlide}>
        <div className={styles.slideBanner__buttons__leftButton}>
          <img
            src="./img/icons/chevron-arrow-left--white.svg"
            alt="previous banner"
          />
        </div>
      </div>
      <div className={styles.slideBanner__banner} key={currentBanner.id}>
        <div className={styles.slideBanner__banner__image}>
          <div className={styles.slideBanner__banner__image__text}>
            <span className={styles.slideBanner__banner__image__text__title}>
              {currentBanner.title}
            </span>

            <p className={styles.slideBanner__banner__image__text__subtitle}>
              {currentBanner.subtitle}
            </p>
          </div>
          <img src={currentBanner.img} alt={currentBanner.title} />
        </div>
        <div className={styles.slideBanner__banner__box}>
          <div className={styles.slideBanner__banner__box__text}>
            <span className={styles.slideBanner__gradient}>
              Now available in our store!
            </span>
            <img
              className={styles.slideBanner__banner__box__text__smile}
              src="./img/icons/ok-smile.png"
              alt="ok smile"
            />
          </div>

          <p className={styles.slideBanner__banner__box__subtitle}>
            Be the first!
          </p>

          <Link
            to={currentBanner.link}
            className={styles.slideBanner__banner__box__button}
          >
            Order Now
          </Link>
        </div>
      </div>

      <Link
        to={currentBanner.link}
        className={styles.slideBanner__mobileBanner}
        key={`mobile-${currentBanner.id}`}
      >
        <div className={styles.slideBanner__mobileBanner__text}>
          <span className={styles.slideBanner__gradient}>
            Now available in our store!
          </span>
        </div>
        <div className={styles.slideBanner__mobileBanner__info}>
          <span className={styles.slideBanner__mobileBanner__info__title}>
            {currentBanner.title}
          </span>

          <p className={styles.slideBanner__mobileBanner__info__subtitle}>
            {currentBanner.subtitle}
          </p>
          <div className={styles.slideBanner__mobileBanner__image}>
            <img src={currentBanner.img} alt={currentBanner.title} />
          </div>
        </div>
      </Link>
      <div className={styles.slideBanner__buttons} onClick={nextSlide}>
        <div className={styles.slideBanner__buttons__rightButton}>
          <img
            src="./img/icons/chevron-arrow-right--white.svg"
            alt="next banner"
          />
        </div>
      </div>

      <div className={styles.slideBanner__dots}>
        {banners.map((_, index) => (
          <div
            key={index}
            className={
              index === currentIndex
                ? styles.slideBanner__dot__active
                : styles.slideBanner__dot
            }
            onClick={() => goToSlide(index)}
            style={{ cursor: 'pointer' }}
          ></div>
        ))}
      </div>
    </div>
  );
};
