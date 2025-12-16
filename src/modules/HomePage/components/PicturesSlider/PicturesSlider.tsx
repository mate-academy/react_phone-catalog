import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  hasEmoji?: boolean;
};

const banners: Banner[] = [
  {
    id: 1,
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    imageUrl: '/img/phones/apple-iphone-14-pro/spaceblack/03.webp',
    hasEmoji: true,
  },
  {
    id: 2,
    title: 'Now available in our store!',
    subtitle: 'Pro. Beyond.',
    imageUrl: '/img/phones/apple-iphone-14/midnight/04.webp',
    hasEmoji: true,
  },
  {
    id: 3,
    title: 'Now available in our store!',
    subtitle: 'Check out our latest devices',
    imageUrl: '/img/phones/apple-iphone-14/midnight/01.webp',
    hasEmoji: true,
  },
];

const SLIDE_CHANGE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex(current => (current + 1) % banners.length);
  };

  const handlePrev = () => {
    setActiveIndex(current =>
      current === 0 ? banners.length - 1 : current - 1,
    );
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setActiveIndex(current => (current + 1) % banners.length);
    }, SLIDE_CHANGE_INTERVAL);

    return () => clearInterval(timerId);
  }, []);

  const activeBanner = banners[activeIndex];

  return (
    <div className={styles.slider}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={handlePrev}
      >
        ‹
      </button>

      <div className={styles.imageWrapper}>
        <div className={styles.textBlock}>
          <p className={styles.title}>
            {activeBanner.title}
            {activeBanner.hasEmoji && <span className={styles.emoji}>👌</span>}
          </p>

          <p className={styles.subtitle}>{activeBanner.subtitle}</p>

          <button type="button" className={styles.button}>
            ORDER NOW
          </button>
        </div>

        <img
          src={activeBanner.imageUrl}
          alt={activeBanner.subtitle}
          className={styles.image}
        />
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={handleNext}
      >
        ›
      </button>

      <div className={styles.dots}>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={
              index === activeIndex
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
