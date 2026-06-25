import { useState, useEffect } from 'react';
import styles from './Hero.module.scss';
import classNames from 'classnames';
import { Title } from '../../../../components/Title';
import { ButtonWithIcon } from '../../../../components/ButtonWithIcon';

const desktopImages = [
  'img/banner-iphone14Pro-desktop.png',
  'img/banner-iPhone-desktop.jpg',
  'img/banner-iPhones-desktop.jpg',
];

const mobileImages = [
  'img/banner-iPhone14Pro.png',
  'img/banner-watch.jpg',
  'img/banner-headphones.png',
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  let startX = 0;

  useEffect(() => {
    const checkScreen = () => setIsTablet(window.innerWidth < 640);

    checkScreen();

    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const images = isTablet ? mobileImages : desktopImages;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      setCurrent(prev => (prev + 1) % images.length);
    } else if (diff < -50) {
      setCurrent(prev => (prev - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => setCurrent(prev => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent(prev => (prev - 1 + images.length) % images.length);

  return (
    <section className={styles.hero}>
      <Title text="Product Catalog" />
      <div className={styles.slider}>
        <div className={styles.slider__top}>
          <div className={styles.slider__banner}>
            <ButtonWithIcon
              iconName="bannerArrow"
              rotate={180}
              onClick={prevSlide}
            />
          </div>

          <div
            className={styles.slider__content}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.slider__images}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className={styles.slider__image}
                />
              ))}
            </div>
          </div>

          <div className={styles.slider__banner}>
            <ButtonWithIcon iconName="bannerArrow" onClick={nextSlide} />
          </div>
        </div>

        <div className={styles.slider__indicators}>
          {images.map((_, index) => (
            <span
              key={index}
              className={classNames(styles.slider__indicator, {
                [styles['slider__indicator--active']]: index === current,
              })}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};
