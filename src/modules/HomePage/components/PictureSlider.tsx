// src/modules/HomePage/components/PictureSlider.tsx
import React, { useEffect, useState } from 'react';
import styles from './PictureSlider.module.scss';

interface PictureSliderProps {
  images: string[];
}

const PictureSlider: React.FC<PictureSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className={styles.slider}>
      <button className={styles.navButton} onClick={prevSlide}>
        &lt;
      </button>
      <div className={styles.slide}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button className={styles.navButton} onClick={nextSlide}>
        &gt;
      </button>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PictureSlider;
