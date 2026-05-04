import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  `${import.meta.env.BASE_URL}img/banner-phones.png`,
  `${import.meta.env.BASE_URL}img/banner-tablets.png`,
  `${import.meta.env.BASE_URL}img/banner-accessories.png`,
];

export const PicturesSlider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.slider}>
      <button className={styles.prevButton} onClick={prevImage}>
        ‹
      </button>
      <div className={styles.imageContainer}>
        <img
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          className={styles.image}
        />
      </div>
      <button className={styles.nextButton} onClick={nextImage}>
        ›
      </button>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentImage ? styles.active : ''}`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};
