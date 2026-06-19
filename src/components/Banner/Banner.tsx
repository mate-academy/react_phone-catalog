import { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import cn from 'classnames';

export const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [
    './img/banner-phones.png',
    './img/banner-accessories.png',
    './img/banner-tablets.png',
  ];

  //#region handleArrows

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(banners.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  //#endregion

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
