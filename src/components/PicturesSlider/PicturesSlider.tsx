import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';
import arrowLeft from '/img/icons/arrows/arrow-left-icon.svg';
import arrowRight from '/img/icons/arrows/arrow-right-icon.svg';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.BASE_URL || '/';

const PicturesSlider = () => {
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const sliderInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 640;

  const imageCount = 3;

  const stopInterval = useCallback(() => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
      sliderInterval.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    if (imageCount > 1) {
      sliderInterval.current = setInterval(() => {
        setCurrentImage(prevIndex => (prevIndex + 1) % imageCount);
      }, 5000);
    }
  }, [stopInterval, imageCount]);

  useEffect(() => {
    startInterval();

    return stopInterval;
  }, [startInterval, stopInterval]);

  const handleNextImage = () => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentImage(prevIndex => (prevIndex + 1) % imageCount);
    startInterval();
  };

  const handlePrevImage = () => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentImage(prevIndex => (prevIndex - 1 + imageCount) % imageCount);
    startInterval();
  };

  const handleDotClick = (index: number) => {
    if (index === currentImage || imageCount <= 1) {
      return;
    }

    setCurrentImage(index);
    startInterval();
  };

  useEffect(() => {
    if (imageWrapperRef.current) {
      const translateXValue = -currentImage * 33.33;

      imageWrapperRef.current.style.transform = `translateX(${translateXValue}%)`;

      imageWrapperRef.current.style.width = `${imageCount * 100}%`;
    }
  }, [currentImage, imageCount]);

  return (
    <div className={`${styles.slider}`}>
      <h1 className={styles.hidden_title}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.slider__content}>
        {imageCount > 1 && (
          <button
            className={`${styles.slider__button} ${styles['slider__button-left']}`}
            onClick={handlePrevImage}
          >
            <img src={arrowLeft} alt="Previous" />
          </button>
        )}

        <div className={styles.slider__viewport}>
          <div
            className={styles['slider__image-wrapper']}
            ref={imageWrapperRef}
          >
            {[1, 2, 3].map(index => {
              const isSmall = isMobile && index === 1;
              const fileType = index === 1 ? 'png' : 'jpg';
              const src = `${BASE_URL}/img/banners/banner-${isSmall ? 'small' : 'big'}${!isSmall ? index : ''}.${fileType}`;

              return (
                <>
                  <img
                    src={src}
                    alt={`slide-${index}`}
                    className={`
                    ${styles.slider__image}
                    ${index === 1 ? styles.slider__image_main : ''}`}
                  />
                  {index === 1 && (
                    <button
                      className={styles.slider__ctaButton}
                      onClick={() =>
                        navigate('/phones/apple-iphone-14-pro-1tb-gold')
                      }
                    >
                      Order now
                    </button>
                  )}
                </>
              );
            })}
          </div>
        </div>

        {imageCount > 1 && (
          <button
            className={`${styles.slider__button} ${styles['slider__button-right']}`}
            onClick={handleNextImage}
          >
            <img src={arrowRight} alt="Next" />
          </button>
        )}
      </div>

      {imageCount > 1 && (
        <div className={styles.slider__navigation}>
          <div className={styles.slider__dots}>
            {[1, 2, 3].map((_, index) => (
              <button
                className={`${styles.slider__dot} ${currentImage === index ? styles['slider__dot--active'] : ''}`}
                key={index}
                onClick={() => handleDotClick(index)}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PicturesSlider;
