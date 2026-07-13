import styles from './MobilePicturesSlider.module.scss';
import { useCallback, useEffect, useState, useRef } from 'react';

export const MobilePicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);

  const isAutoScrolling = useRef(false);

  const pictures = [
    'img/Banner-1_small.png',
    'img/Banner-2_small.png',
    'img/Banner-3_small.png',
  ];

  const moveNext = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;

      return nextIndex > pictures.length - 1 ? 0 : nextIndex;
    });
  }, [pictures.length]);

  const handleScroll = () => {
    if (!windowRef.current || isAutoScrolling.current) {
      return;
    }

    const scrollLeft = windowRef.current.scrollLeft;
    const windowWidth = windowRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / windowWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (windowRef.current) {
      isAutoScrolling.current = true;

      windowRef.current.scrollTo({
        left: currentIndex * windowRef.current.clientWidth,
        behavior: 'smooth',
      });

      timeout = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 350);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [moveNext]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.window} ref={windowRef} onScroll={handleScroll}>
        <div className={styles.tape}>
          {pictures.map(banner => (
            <img
              key={banner}
              className={styles.banner}
              src={banner}
              alt="Mobile Banner"
            />
          ))}
        </div>
      </div>

      <div className={styles.position}>
        {pictures.map((_, index) => (
          <button
            key={index}
            style={index === currentIndex ? { backgroundColor: '#313237' } : {}}
            className={styles.positionButton}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
