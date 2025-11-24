import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  'https://via.placeholder.com/800x300/0077ff/ffffff?text=Smartphones+Promo',
  'https://via.placeholder.com/800x300/ff0077/ffffff?text=Tablets+Deals',
  'https://via.placeholder.com/800x300/00cc66/ffffff?text=Accessories+Sale',
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Troca automática a cada 5s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Próxima imagem
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  // Imagem anterior
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  // Selecionar imagem exata via dash
  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.slider}>
      {/* Imagem atual */}
      <div className={styles.imageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      {/* Controles esquerda/direita */}
      <button
        className={`${styles.button} ${styles.prev}`}
        onClick={handlePrev}
        aria-label="Previous"
      >
        {'<'}
      </button>

      <button
        className={`${styles.button} ${styles.next}`}
        onClick={handleNext}
        aria-label="Next"
      >
        {'>'}
      </button>

      {/* Dashes (indicadores) */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ''
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
