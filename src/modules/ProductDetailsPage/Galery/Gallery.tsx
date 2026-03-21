import classNames from 'classnames';
import style from './Gallery.module.scss';
import React, { useRef, useState } from 'react';

type Props = {
  images: string[];
};

export const Gallery: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef(0);

  const nextBunner = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);

  const previosBunner = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );

  const handleTouchStart = (event: React.TouchEvent) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const endX = event.changedTouches[0].clientX;

    if (startXRef.current - endX > 50) {
      nextBunner();
    } else if (endX - startXRef.current > 50) {
      previosBunner();
    }
  };

  return (
    <div className={style.gallery}>
      <div
        className={style.gallery__containerMainImage}
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images?.map(image => (
          <img key={image} src={image} alt="Product image" />
        ))}
      </div>
      <div className={style.gallery__containerMinImages}>
        {images?.map((image, index) => (
          <img
            key={image}
            src={image}
            alt="foto to choose"
            className={classNames(style.gallery__min, {
              [style['gallery__min--active']]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
