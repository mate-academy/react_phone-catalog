/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';

import styles from './PicturesSlider.module.scss';
import arrowLeft from '../../images/icons/arrow_left.png';
import arrowRight from '../../images/icons/arrow_right.png';
import { useEffect, useState } from 'react';
import img1 from '../../images/slider/banner-accessories.png';
import img2 from '../../images/slider/banner-phones.png';
import img3 from '../../images/slider/banner-tablets.png';

const images = [img1, img2, img3];

export const PicturesSlider = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const goToSlide = (direction: number) => {
    setCurrentImage(prev => (prev + direction + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => goToSlide(1), 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => goToSlide(1);
  const handlePrev = () => goToSlide(-1);
  const handleDots = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.slider}>
      <h1 className={styles.slider__title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.slider__container}>
        <button
          className={cn(styles.slider__button, styles['slider__button--left'])}
          onClick={handlePrev}
        >
          <img
            src={arrowLeft}
            alt="Arrow Left"
            className={styles.slider__img}
          />
        </button>

        {images.map((img, index) => (
          <div
            key={img}
            className={cn(styles.slider__content, {
              [styles['slider__content--active']]: index === currentImage,
            })}
          >
            <img src={img} alt="slide" className={styles.slider__slide} />
          </div>
        ))}

        <button
          className={cn(styles.slider__button, styles['slider__button--right'])}
          onClick={handleNext}
        >
          <img
            src={arrowRight}
            alt="Arrow Right"
            className={styles.slider__img}
          />
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <div key={index} className={styles.dots__container}>
            <button
              className={cn(styles.dots__item, {
                [styles['dots__item--active']]: index === currentImage,
              })}
              onClick={() => handleDots(index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};
