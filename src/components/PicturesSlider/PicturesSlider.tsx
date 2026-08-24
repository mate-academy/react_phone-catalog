import { useEffect, useState } from 'react';
import styles from './picturesSlider.module.scss';
import { useNavigate } from 'react-router-dom';

export const PicturesSlider = () => {
  const isMobile = window.innerWidth > 639;
  const navigate = useNavigate();

  const images = [
    isMobile
      ? `${import.meta.env.BASE_URL}/img/banner1.svg`
      : `${import.meta.env.BASE_URL}/img/mobileBanner.svg`,
    `${import.meta.env.BASE_URL}/img/banner-phones.png`,
    isMobile
      ? `${import.meta.env.BASE_URL}/img/banner-accessories.png`
      : `${import.meta.env.BASE_URL}/img/mobileBanner3.jpg`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextButton = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const prevButton = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.slider}>
        <button className={styles.slider__button} onClick={prevButton}>
          <img
            className={`${styles.slider__arrow} ${styles.lightIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons/ArrowLeft.svg`}
            alt="icon arrow left"
          />
          <img
            className={`${styles.slider__arrow} ${styles.darkIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons-dark/Arrow–left.svg`}
            alt="icon arrow left"
          />
        </button>
        <div className={styles.slider__viewport}>
          <div
            className={styles.slider__track}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className={styles.slider__slide}>
                <img
                  className={styles.slider__image}
                  src={image}
                  alt={`Slide ${index + 1}`}
                />

                {index === 0 && (
                  <button
                    type="button"
                    className={styles.slider__bannerButton}
                    onClick={() =>
                      navigate('/phones/apple-iphone-14-pro-128gb-spaceblack')
                    }
                    aria-label="Order now"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <button className={styles.slider__button} onClick={nextButton}>
          <img
            className={`${styles.slider__arrow} ${styles.lightIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons/ArrowRight.svg`}
            alt="icon arrow right"
          />
          <img
            className={`${styles.slider__arrow} ${styles.darkIcon}`}
            src={`${import.meta.env.BASE_URL}/img/icons-dark/Arrow-right.svg`}
            alt="icon arrow right"
          />
        </button>
      </div>

      <div className={styles.navigation}>
        <div className={styles.navigation__dots}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.navigation__dot} ${
                currentIndex === index ? styles.active : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
