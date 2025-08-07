import { useEffect, useRef, useState } from 'react';
import styles from './Swiper.module.scss';

export const Swiper: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const imagesIPhone = [
    'img/swiper images/iphone14Pro.png',
    'img/swiper images/iphone14Pro-pink.png',
    'img/swiper images/iphone14Pro-white.png',
  ];

  const changeInterval = 5000;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === imagesIPhone.length - 1 ? 0 : prevIndex + 1,
      );
    }, changeInterval);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    const swipeThreshold = 50;

    if (deltaX > swipeThreshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (
      deltaX < -swipeThreshold &&
      activeIndex < imagesIPhone.length - 1
    ) {
      setActiveIndex(activeIndex + 1);
    }

    resetInterval();
    setTouchStartX(null);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === imagesIPhone.length - 1 ? 0 : prevIndex + 1,
      );
    }, changeInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className={styles.swiper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.swiper_list}>
        <div
          className={styles.swiper_list_track}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {imagesIPhone.map((src, index) => (
            <div key={index} className={styles.image}>
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        {imagesIPhone.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              resetInterval();
            }}
            className={`${styles.dot} ${
              index === activeIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};
