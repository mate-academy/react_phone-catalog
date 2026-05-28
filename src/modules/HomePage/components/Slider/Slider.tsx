import { useEffect, useState } from 'react';
import { PromoImageData } from '../../../../types/PromoImgType';
import styles from './Slider.module.scss';
import cn from 'classnames';

const SLIDER_DELAY = 5000;
const MIN_TABLET_SCREEN_SIZE = 640;

const sliderData: PromoImageData[] = [
  {
    url: '/promo/Apple-iPhone-15-promo-banner-buy-now-scaled.jpg',
    croppedImgUrl: '/promo/iphone-cropped.jpg',
    alt: 'Iphone',
  },
  {
    url: '/promo/Banner-Samsung-Galaxy-S25-FE-Launch-Over-Desktop.webp',
    croppedImgUrl: '/promo/cropped-sumsung.webp',
    alt: 'Samsung',
  },
  {
    url: '/promo/Banner-web-Serie-RN15.jpg',
    croppedImgUrl: '/promo/xiaomi-cropped.png',
    alt: 'Xiaomi',
  },
];

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = () => {
    setCurrentSlide(prev => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const goBack = () => {
    setCurrentSlide(prev => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, SLIDER_DELAY);

    return () => clearInterval(interval);
  }, []);

  const currentImage = sliderData[currentSlide];

  const handleClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.controls}>
        <button className={styles.btn} onClick={goBack}>
          <img src="/icons/chevron-arrow-left.svg" alt="" />
        </button>
        <div className={styles.imgContainer}>
          <img
            className={styles.sliderImg}
            src={
              windowWidth >= MIN_TABLET_SCREEN_SIZE
                ? currentImage.url
                : currentImage.croppedImgUrl
            }
            alt={currentImage.alt}
          />
        </div>
        <button className={styles.btn} onClick={goNext}>
          <img src="/icons/chevron-arrow-right.svg" alt="" />
        </button>
      </div>
      <div className={styles.sliderBtns}>
        {sliderData.map((_, index) => (
          <button
            key={index}
            className={cn(styles.sliderBtn, {
              [styles.active]: currentSlide === index,
            })}
            onClick={() => handleClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
