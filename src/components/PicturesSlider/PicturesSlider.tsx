import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    image: `${import.meta.env.BASE_URL}img/banner-Iphone14.png`,
    label: 'Now available in our store! 👌',
    caption: 'Be the first!',
    button: 'ORDER NOW',
  },
  {
    image: `${import.meta.env.BASE_URL}img/banner-phones.png`,
  },
  {
    image: `${import.meta.env.BASE_URL}img/banner-tablets.png`,
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % slides.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentImage];

  return (
    <div className={styles.slider}>
      <button className={styles.prevButton} onClick={prevImage}>
        ‹
      </button>
      <div className={styles.imageContainer}>
        <img
          src={currentSlide.image}
          alt={`Slide ${currentImage + 1}`}
          className={styles.image}
        />

        {currentSlide.label && (
          <div className={styles.overlay}>
            <div className={styles.overlayCard}>
              <p className={styles.label}>{currentSlide.label}</p>
              <p className={styles.caption}>{currentSlide.caption}</p>
              <button type="button" className={styles.ctaButton}>
                {currentSlide.button}
              </button>
            </div>
          </div>
        )}
      </div>
      <button className={styles.nextButton} onClick={nextImage}>
        ›
      </button>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentImage ? styles.active : ''}`}
            onClick={() => goToImage(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};
