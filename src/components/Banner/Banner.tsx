import { useEffect, useRef, useState } from 'react';
import styles from './Banner.module.scss';
import cn from 'classnames';

export const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [
    './img/banner-phones.png',
    './img/banner-accessories.png',
    './img/banner-tablets.png',
  ];
  const touchStartX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  //#region  Handle banner slider
  const handleNext = () =>
    setActiveIndex(prev => Math.min(prev + 1, banners.length - 1));
  const handlePrev = () => setActiveIndex(prev => Math.max(prev - 1, 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };
  //#endregion

  return (
    <div className={styles.banner}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {banners.map(banner => (
          <img
            src={banner}
            alt="Banner"
            className={styles.image}
            key={banner}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        ))}
      </div>
      <div className={styles.buttons}>
        {banners.map((banner, index) => (
          <button
            type="button"
            key={banner}
            onClick={() => setActiveIndex(index)}
            className={cn(styles.dot, {
              [styles.dotActive]: index === activeIndex,
            })}
          ></button>
        ))}
      </div>
    </div>
  );
};
