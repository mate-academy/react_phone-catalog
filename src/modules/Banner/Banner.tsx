import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Banner.module.scss';

const bannerData = [
  {
    id: 1,
    title: 'Now available \n in our store!',
    subtitle: 'Be the first!',
    rightTitle: 'iPhone 14 Pro',
    rightSubTitle: 'Pro. Beyond.',
    img: 'img/banner-phones.jpg',
    hasCard: true,
    imgClass: 'banner__image--phones',
    emoji: '👌',
    link: '/phones',
  },
  {
    id: 2,
    title: 'New arrival \n iPad Pro',
    subtitle: 'Pro beyond ',
    rightTitle: 'iPad Pro',
    rightSubTitle: 'Supercharged by M2.',
    img: 'img/banner-tablets.png',
    hasCard: true,
    imgClass: 'banner__image--tablets',
    link: '/tablets',
  },
  {
    id: 3,
    title: 'Find everything \n you need',
    subtitle: 'Level up your style',
    rightTitle: 'Accessories',
    rightSubTitle: 'Personalize your devices.',
    img: 'img/banner-accessories.webp',
    hasCard: true,
    imgClass: 'banner__image--accessories',
    link: '/accessories',
  },
];

export const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback((index: number) => {
    const windowEl = windowRef.current;

    if (windowEl) {
      const windowWidth = windowEl.clientWidth;

      windowEl.scrollTo({
        left: index * windowWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  const nextSlide = useCallback(() => {
    const nextIndex =
      currentIndex === bannerData.length - 1 ? 0 : currentIndex + 1;

    setCurrentIndex(nextIndex);
    scrollToSlide(nextIndex);
  }, [currentIndex, scrollToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex =
      currentIndex === 0 ? bannerData.length - 1 : currentIndex - 1;

    setCurrentIndex(prevIndex);
    scrollToSlide(prevIndex);
  }, [currentIndex, scrollToSlide]);

  const handleArrowClick = (direction: 'next' | 'prev') => {
    setIsAutoPlay(true);
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
    scrollToSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay]);

  const handleScroll = () => {
    const windowEl = windowRef.current;

    if (!windowEl) {
      return;
    }

    const scrollPosition = windowEl.scrollLeft;
    const windowWidth = windowEl.clientWidth;

    if (windowWidth === 0) {
      return;
    }

    const currentSlideIndex = Math.round(scrollPosition / windowWidth);

    if (
      currentSlideIndex !== currentIndex &&
      currentSlideIndex < bannerData.length
    ) {
      setCurrentIndex(currentSlideIndex);
    }
  };

  const getImgClass = (className: string) => {
    if (className === 'banner__image--phones') {
      return styles['banner__image--phones'];
    }

    if (className === 'banner__image--tablets') {
      return styles['banner__image--tablets'];
    }

    if (className === 'banner__image--accessories') {
      return styles['banner__image--accessories'];
    }

    return '';
  };

  return (
    <section className={styles.banner}>
      <div className={styles.banner__main}>
        <button
          type="button"
          className={`${styles.banner__arrow} ${styles['banner__arrow--left']}`}
          onClick={() => handleArrowClick('prev')}
        />

        <div
          className={styles.banner__window}
          ref={windowRef}
          onScroll={handleScroll}
        >
          <div className={styles.banner__list}>
            {bannerData.map(item => (
              <div key={item.id} className={styles.banner__item}>
                <div
                  className={`${styles['banner__text-block']} ${
                    item.hasCard ? styles['banner__text-block--with-card'] : ''
                  }`}
                >
                  <h2 className={styles.banner__title}>
                    {item.title}
                    {item.emoji && (
                      <span className={styles.banner__emoji}>{item.emoji}</span>
                    )}
                  </h2>
                  <p className={styles.banner__subtitle}>{item.subtitle}</p>
                  <Link to={item.link} className={styles['banner__btn-order']}>
                    ORDER NOW
                  </Link>
                </div>

                <div className={styles['banner__image-block']}>
                  {item.rightTitle && (
                    <div className={styles['banner__right-text']}>
                      <h4 className={styles['banner__mobile-title']}>
                        {item.title}
                      </h4>
                      <h3 className={styles['banner__right-title']}>
                        {item.rightTitle}
                      </h3>
                      <p className={styles['banner__right-subtitle']}>
                        {item.rightSubTitle}
                      </p>
                    </div>
                  )}
                  <img
                    src={item.img}
                    alt="Banner"
                    className={`${styles.banner__image} ${getImgClass(
                      item.imgClass,
                    )}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.banner__arrow} ${styles['banner__arrow--right']}`}
          onClick={() => handleArrowClick('next')}
        />
      </div>

      <div className={styles.banner__dots}>
        {bannerData.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.banner__dot} ${
              currentIndex === index ? styles['banner__dot--active'] : ''
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </section>
  );
};
