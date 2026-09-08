import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../../../shared/components/Icon/Icon';
import styles from './PicturesSlider.module.scss';

const images = [
  'img/apple-iphone-14-pro-128gb-spaceblack.webp',
  'img/apple-iphone-14-pro-128gb-gold.webp',
  'img/apple-iphone-14-pro-128gb-spaceblack--2.webp',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const currentImage = images[currentIndex];
  const productId = currentImage
    .substring(currentImage.lastIndexOf('/') + 1)
    .replace('.webp', '');

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <button className={styles.slider__arrow} onClick={prevSlide}>
          <Icon name="arrow_left" />
        </button>

        <div className={styles.slider__wrapper}>
          <div className={styles.slider__info}>
            <div className={styles.slider__text}>
              <h2 className={styles.slider__title}>
                Now available in our store!
              </h2>

              <p className={styles.slider__description}>Be the first!</p>
            </div>

            <Link
              to={`/phones/${productId.split('--')[0]}`}
              className={styles.slider__button}
            >
              Order now
            </Link>
          </div>

          <div className={styles.slider__picture}>
            <h2
              className={`
                ${styles.slider__title}
                ${styles['slider__title--mobile']}
              `}
            >
              Now available in our store!
            </h2>

            <p className={styles.slider__headline}>iPhone 14 Pro</p>

            <p className={styles.slider__caption}>Pro.Beyond.</p>

            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="iPhone 14 Pro"
                className={cn(styles.slider__image, {
                  [styles['slider__image--active']]: index === currentIndex,
                })}
              />
            ))}
          </div>
        </div>

        <button className={styles.slider__arrow} onClick={nextSlide}>
          <Icon name="arrow_right" />
        </button>
      </div>

      <div className={styles.slider__dots}>
        {[1, 2, 3].map((_n, i) => (
          <div
            key={i}
            className={styles['slider__dot-wrapper']}
            onClick={() => setCurrentIndex(i)}
          >
            <div
              className={cn(styles.slider__dot, {
                [styles['slider__dot--active']]: currentIndex === i,
              })}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};
