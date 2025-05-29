import { useEffect, useRef, useState } from 'react';
import styles from './PicturesSlider.module.scss';
const images = [
  'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1068/cached.' +
    'offlinehbpl.hbpl.co.uk/news/OMC/iPhoneX-20170913095319465.jpg',
  'https://www.patentlyapple.com/.a/6a0120a5580826970c0240a4fda20c200d-800wi',
  'https://www.esourceparts.ca/blog/wp-content/uploads/' +
    '2020/12/Top-5-Cheapestand-Amazing-Apple-Accessories.jpg',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = e => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = e => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      // swipe left
      setCurrentIndex(prev => Math.min(prev + 1, 2));
    } else if (distance < -50) {
      // swipe right
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
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
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className={styles.image}
          />
        ))}
      </div>

      <div className={styles.lowerButtons}>
        {images.map((item, index) => {
          return (
            <div
              key={item}
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
  );
};
