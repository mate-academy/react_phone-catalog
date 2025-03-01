import styles from './MainSlider.module.scss';
import { useState, useEffect } from 'react';
import ArrowLeft from '../../../../images/icons/Arrow Left.png';
import ArrowRight from '../../../../images/icons/Arrow Right.png';

interface Props {
  slides: string[];
  interval?: number;
}

export const MainSlider: React.FC<Props> = ({ slides, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <button className={styles.slider__arrow} onClick={prevSlide}>
          <img src={ArrowLeft} className={styles.slider__icon} />
        </button>

        <ul className={styles.slider__list}>
          {slides.map((slide, index) => (
            <li
              className={`${styles.slider__item} ${
                index === currentSlide ? styles.active : ''
              }`}
              key={index}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className={styles.slider__image}
              />
            </li>
          ))}
        </ul>

        <button className={styles.slider__arrow} onClick={nextSlide}>
          <img src={ArrowRight} className={styles.slider__icon} />
        </button>
      </div>

      <div className={styles.slider__indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.slider__dot} ${index === currentSlide ? styles.slider__activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};
