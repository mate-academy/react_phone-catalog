import React, { FC, useRef, useState } from 'react';
import styles from './PhotoSlider.module.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
};
const PhotoSlider: FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Перехід до фото за індексом
  const goToIndex = (index: number) => {
    if (index < 0) {
      setCurrentIndex(images.length - 1);
    } else if (index >= images.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  // Обробка свайпу (Touch Events)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 50) {
      goToIndex(currentIndex - 1);
    } // Свайп вправо

    if (deltaX < -50) {
      goToIndex(currentIndex + 1);
    } // Свайп вліво
  };

  // Обробка прокрутки коліщатком миші
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      goToIndex(currentIndex + 1);
    } // Колесо вниз

    if (e.deltaY < 0) {
      goToIndex(currentIndex - 1);
    } // Колесо вгору
  };

  return (
    <>
      {/* Головне фото */}
      <div
        // className={styles.slider}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
        className={styles.mainSlide}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles.mainSlide__image}
        />
      </div>

      {/* Доріжка з мініатюрами */}
      <div className={styles.thumbnail}>
        {images.map((image, index) => (
          <div
            key={index}
            className={classNames(styles.thumbnail__item, {
              [styles.thumbnail__item_active]: currentIndex === index,
            })}
            onClick={() => goToIndex(index)}
          >
            <img
              className={styles.thumbnail__img}
              src={image}
              alt={`Thumbnail ${index}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotoSlider;
