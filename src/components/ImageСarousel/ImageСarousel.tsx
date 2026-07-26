import styles from './ImageCarousel.module.scss';

import Chevron from '../../UI/Buttons/Icons/ChevronRight.png';
import Banners from '../../UI/photos/Banner.svg';
import Phones from '../../UI/photos/banner-phones.png';
import { useEffect, useState } from 'react';

const ImageСarousel = () => {
  const images = [Banners, Phones, Banners];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(next => (next === images.length - 1 ? 0 : next + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.imageCarousel}>
      <button
        className={styles.imageCarousel__button}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <img src={Chevron} alt="Previous slide" sizes="20" />
      </button>

      <div className={styles.imageCarousel__viewport}>
        <div
          className={styles.imageCarousel__track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageCarousel__slide}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className={styles.imageCarousel__indicators}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`
        ${styles.imageCarousel__indicator}
        ${currentIndex === index ? styles.imageCarousel__indicator_active : ''}
      `}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <button
        className={styles.imageCarousel__button}
        onClick={handleNext}
        disabled={currentIndex === images.length - 1}
      >
        <img
          src={Chevron}
          alt="Next slide"
          style={{ transform: 'rotate(180deg)' }}
        />
      </button>
    </div>
  );
};

export default ImageСarousel;
