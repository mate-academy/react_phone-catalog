import { useEffect, useRef, useState } from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  data: {
    src: string;
    alt: string;
  }[];
}

export const Banner = ({ data }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = data.length - 1;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const getSlideWidth = () => {
    return wrapperRef.current?.offsetWidth || 0;
  };

  return (
    <div className={styles.banner}>
      <button
        className={`${styles.banner__arrow} ${styles[`banner__arrow--left`]}`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        &lt;
      </button>

      <div className={styles.banner__wrapper} ref={wrapperRef}>
        <div
          className={styles.banner__track}
          style={{
            transform: `translateX(-${currentIndex * getSlideWidth()}px)`,
          }}
        >
          {data.map((item, index) => (
            <img
              src={item.src}
              alt={item.alt}
              key={index}
              className={styles.banner__slide}
            />
          ))}
        </div>
      </div>

      <button
        className={`${styles.banner__arrow} ${styles[`banner__arrow--right`]}`}
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
      >
        &gt;
      </button>
    </div>
  );
};
