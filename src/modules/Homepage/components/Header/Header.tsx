import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
const images = [
  {
    id: 1,
    url:
      'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1068/cached.' +
      'offlinehbpl.hbpl.co.uk/news/OMC/iPhoneX-20170913095319465.jpg',
  },
  {
    id: 2,
    url:
      'https://www.patentlyapple.com/.a/' +
      '6a0120a5580826970c0240a4fda20c200d-800wi',
  },
  {
    id: 3,
    url:
      'https://www.esourceparts.ca/blog/wp-content/uploads/' +
      '2020/12/Top-5-Cheapestand-Amazing-Apple-Accessories.jpg',
  },
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      setCurrentIndex(prev => Math.min(prev + 1, 2));
    } else if (distance < -50) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  function handleIndexInc() {
    if (currentIndex < 2) {
      setCurrentIndex(cur => cur + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function handleIndexDec() {
    if (currentIndex > 0) {
      setCurrentIndex(cur => cur - 1);
    } else {
      setCurrentIndex(2);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.slider_arrow__left} onClick={handleIndexDec}></div>
      <div
        className={styles.sliderWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.sliderInner}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map(slide => (
            <img
              key={slide.id}
              src={slide.url}
              alt={`Slide ${slide.id}`}
              className={styles.image}
            />
          ))}
        </div>

        <div className={styles.lowerButtons}>
          {images.map((slide, index) => {
            return (
              <div
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={
                  currentIndex === index
                    ? styles.lowerButtons__button_active
                    : styles.lowerButtons__button
                }
              ></div>
            );
          })}
        </div>
      </div>
      <div
        className={styles.slider_arrow__right}
        onClick={handleIndexInc}
      ></div>
    </div>
  );
};
