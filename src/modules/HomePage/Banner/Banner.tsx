import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Banner.module.scss';

interface BannerProps {
  data: {
    src: string;
    alt: string;
  }[];
}

export const Banner = ({ data }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const maxIndex = data.length - 1;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) {
        setSlideWidth(wrapperRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const setSlide = (number: number) => {
    setCurrentIndex(number);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  return (
    <div className={`${styles.banner} ${styles['banner--margin']}`}>
      <button
        className={`${styles.banner__arrow} ${styles['banner__arrow--left']}`}
        onClick={handlePrev}
      >
        &lt;
      </button>

      <div className={styles.banner__content}>
        <div {...handlers} className={styles.banner__wrapper} ref={wrapperRef}>
          <div
            className={styles.banner__track}
            style={{
              transform: `translateX(-${currentIndex * slideWidth}px)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {data.map((item, index) => (
              <img
                src={item.src}
                alt={item.alt}
                key={index}
                className={styles.banner__slide}
                draggable={false}
              />
            ))}
          </div>
        </div>

        <div className={styles.banner__dashes}>
          {data.map((_, index) => (
            <button
              key={index}
              className={`${styles.banner__dashes__dash} ${
                currentIndex === index ? styles['banner__dashes__dash--active'] : ''
              }`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </div>

      <button
        className={`${styles.banner__arrow} ${styles['banner__arrow--right']}`}
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};