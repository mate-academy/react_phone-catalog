import styles from './ProductsSlider.module.scss';

import { useState, useEffect } from 'react';
import './ProductsSlider.module.scss';
import { Product } from '../../../shared/types/products';

export const ProductsSlider = () => {
  const [products, setImages] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('api/products.json').then(response => {
      if (!response.ok) {
        throw new Error('My API Error');
      }

      response.json().then(res => setImages(res));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.picturesSlider}>
      <div className={styles.sliderImages}>
        {products.map((product, index) => {
          return (
            <img
              key={product.id}
              src={product.image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? styles.active : ''}
            />
          );
        })}
      </div>

      <div className={styles.sliderControls}>
        {products.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? styles.active : ''}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <button
        className="prevButton"
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 1 + products.length) % products.length,
          )
        }
      >
        &#10094;
      </button>
      <button
        className={styles.nextButton}
        onClick={() => setCurrentIndex((currentIndex + 1) % products.length)}
      >
        &#10095;
      </button>
    </div>
  );
};
