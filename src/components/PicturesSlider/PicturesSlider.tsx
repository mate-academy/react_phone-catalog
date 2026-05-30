import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import styles from './PicturesSlider.module.scss';
import arrowLeft from '../../images/icons/arrow_left.svg';
import arrowLeftDark from '../../images/icons/arrow_left_for_dark.svg';
import arrowRight from '../../images/icons/arrow_right.svg';
import arrowRightDark from '../../images/icons/arrow_right_for_dark.svg';
import img1 from '../../images/slider/banner-accessories.png';
import img2 from '../../images/slider/banner-phones.png';
import img3 from '../../images/slider/banner-tablets.png';

const images = [img1, img2, img3];

export const PicturesSlider = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { theme } = useContext(ThemeContext);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      handleNext();
    } else if (swipeDistance < -50) {
      handlePrev();
    }

    setTouchStartX(null);
  };

  return (
    <div className={styles.slider}>
      <h2
        className={cn({
          [styles.slider__title]: theme === Theme.Light,
          [styles['slider__title-dark']]: theme === Theme.Dark,
        })}
      >
        Welcome to Nice Gadgets store!
      </h2>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={styles.slider__container}
      >
        <button
          className={cn({
            [styles.slider__button]: theme === Theme.Light,
            [styles['slider__button--left']]: theme === Theme.Light,
            [styles['slider__button-dark']]: theme === Theme.Dark,
            [styles['slider__button-dark--left']]: theme === Theme.Dark,
          })}
          onClick={handlePrev}
        >
          <img
            src={theme === Theme.Light ? arrowLeft : arrowLeftDark}
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
          className={cn({
            [styles.slider__button]: theme === Theme.Light,
            [styles['slider__button--right']]: theme === Theme.Light,
            [styles['slider__button-dark']]: theme === Theme.Dark,
            [styles['slider__button-dark--right']]: theme === Theme.Dark,
          })}
          onClick={handleNext}
        >
          <img
            src={theme === Theme.Light ? arrowRight : arrowRightDark}
            alt="Arrow Right"
            className={styles.slider__img}
          />
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <div key={index} className={styles.dots__container}>
            <button
              className={cn({
                [styles.dots__item]: theme === Theme.Light,
                [styles['dots__item--active']]:
                  index === currentImage && theme === Theme.Light,
                [styles['dots__item-dark']]: theme === Theme.Dark,
                [styles['dots__item-dark--active']]:
                  index === currentImage && theme === Theme.Dark,
              })}
              onClick={() => handleDots(index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};
