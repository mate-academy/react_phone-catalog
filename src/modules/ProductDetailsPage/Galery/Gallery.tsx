import classNames from 'classnames';
import style from './Gallery.module.scss';
import React from 'react';
import { useSwipe } from '../../../hook/useSwipe';

type Props = {
  images: string[];
};

export const Gallery: React.FC<Props> = ({ images }) => {
  const { handleTouchStart, handleTouchEnd, currentIndex, setCurrentIndex } =
    useSwipe({ images });

  return (
    <div className={style.gallery}>
      <div className={style.gallery__containerMain}>
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
