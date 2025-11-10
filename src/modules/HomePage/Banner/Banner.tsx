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
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 2)
  );
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < 2 ? prev + 1 : 0));
  };

  const getSlideWidth = () => {
    return wrapperRef.current?.offsetWidth || 0;
  };

  const setSlide = (number: number) => {
    setCurrentIndex(number);
  };

  return (
    <div className={styles.banner}>
      <button
        className={`${styles.banner__arrow} ${styles[`banner__arrow--left`]}`}
        onClick={handlePrev}
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
        <div className={styles.banner__dashes}>
          <button className={styles.banner__dashes__dash}
          onClick={() => setSlide(0)}
          ></button>
          <button className={styles.banner__dashes__dash}
          onClick={() => setSlide(1)}
          ></button>
          <button className={styles.banner__dashes__dash}
          onClick={() => setSlide(2)}
          ></button>
        </div>
      </div>

      <button
        className={`${styles.banner__arrow} ${styles[`banner__arrow--right`]}`}
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};
