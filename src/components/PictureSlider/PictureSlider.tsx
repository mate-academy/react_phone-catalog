import { useEffect, useState } from 'react';
import styles from './PactureSlider.module.scss';
import { Link } from 'react-router-dom';

const slides = [
  'img/slider/banner-1.jpg',
  'img/slider/banner-2.jpg',
  'img/slider/banner-3.jpg',
];

export const PictureSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const previousSlide = () => {
    setCurrentSlide(current =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide(current =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={styles.slider}>
        <button
          className={styles.slider__button}
          onClick={() => {
            previousSlide();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.slider__icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className={styles.slider__imageContainer}>
          {currentSlide === 0 ? (
            <Link to="/phones">
              <img
                src={slides[currentSlide]}
                className={styles.slider__image}
                alt="Nice Gadgets"
              />
            </Link>
          ) : (
            <img
              src={slides[currentSlide]}
              className={styles.slider__image}
              alt="Nice Gadgets"
            />
          )}
        </div>
        <button
          className={styles.slider__button}
          onClick={() => {
            nextSlide();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.slider__icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className={styles.slider__dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.slider__dot} ${
              currentSlide === index ? styles['slider__dot--active'] : ''
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </>
  );
};
