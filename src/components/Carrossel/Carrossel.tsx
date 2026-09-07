import { useState, useEffect } from 'react';
import styles from './Carrossel.module.scss';

export const Carrossel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const definirImagens = () => {
    if (window.innerWidth < 639) {
      setImages([
        'src/image/BannerFor320px.svg',
        'src/image/tes1.png',
        'src/image/tes2.png',
      ]);
    } else {
      setImages([
        'src/image/Banner1.svg',
        'src/image/Banner2.jpg',
        'src/image/Banner3.jpg',
      ]);
    }
  };

  useEffect(() => {
    definirImagens();
    window.addEventListener('resize', definirImagens);

    return () => window.removeEventListener('resize', definirImagens);
  }, []);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className={styles.carrossel__wrapper}>
        <button
          className={styles.carrossel__buttonNav}
          onClick={() =>
            setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
          }
        >
          <img src="src/Icons/rigthArrowBlack.svg" alt="Next" />
        </button>

        <div
          className={styles.carrossel__slide}
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>

        <button
          className={styles.carrossel__buttonNav}
          onClick={() =>
            setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
          }
        >
          <img src="src/Icons/lefthArrowBlack.svg" alt="Prev" />
        </button>
      </div>

      <div className={styles.carrossel__buttons}>
        {images.map((_, index) => (
          <button
            key={index}
            className={
              currentIndex === index
                ? `${styles.carrossel__button} ${styles.carrossel__buttonActive}`
                : styles.carrossel__button
            }
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </>
  );
};
