import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    image: 'img/banner-phones.png',
    link: '/phones',
    alt: 'Phones',
  },
  {
    image: 'img/banner-tablets.png',
    link: '/tablets',
    alt: 'Tablets',
  },
  {
    image: 'img/banner-accessories.png',
    link: '/accessories',
    alt: 'Accessories',
  },
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.slider} aria-label="Product categories">
      <div className={styles.imageWrapper}>
        <Link to={slides[currentSlide].link}>
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            className={styles.image}
          />
        </Link>
      </div>

      <div className={styles.controls}>
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={`${styles.dot} ${
              index === currentSlide ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
};
