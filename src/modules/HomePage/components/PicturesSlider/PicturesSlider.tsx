import React, { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { useNavigate } from 'react-router';

type Props = {
  slides: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
};

export const PictureSlider: React.FC<Props> = ({
  slides,
  autoSlide = true,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);
  const navigate = useNavigate();

  const prev = () =>
    setCurr(currPrev => (currPrev === 0 ? slides.length - 1 : currPrev - 1));
  const next = () =>
    setCurr(currNext => (currNext === slides.length - 1 ? 0 : currNext + 1));
  const goToSlide = (index: number) => {
    setCurr(index);
  };

  useEffect(() => {
    if (!autoSlide || slides.length === 0) {
      return;
    }

    const slideInterval = setInterval(() => {
      setCurr(el => (el === slides.length - 1 ? 0 : el + 1));
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  return (
    <div className={styles.container}>
      <div>
        {slides.length > 0 && (
          <>
            <div className={styles.slideContainer}>
              <button
                onClick={prev}
                className={`${styles.navButton} ${styles.leftButton}`}
              >
                &#10094;
              </button>
              <button
                className={styles.orderButton}
                onClick={() => navigate('/cart')}
              >
                ORDER NOW
              </button>
              <img
                src={slides[curr]}
                alt={`Slide ${curr + 1}`}
                className={styles.slideImage}
              />
              <button
                onClick={next}
                className={`${styles.navButton} ${styles.rightButton}`}
              >
                &#10095;
              </button>
            </div>
            <div className={styles.navDots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.navDot} ${curr === index ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
