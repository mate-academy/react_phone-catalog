import React from 'react';
import cn from 'classnames';

interface PhotoSliderProps {
  photos: string[];
  activePhoto: number;
  onChange: (photoIndex: number) => void;
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({
  photos,
  activePhoto,
  onChange,
}) => {
  return photos.map((photo, i) => {
    return (
      <button
        key={photo}
        onClick={() => onChange(i)}
        className="productPage__button"
      >
        <img
          src={`/${photo}`}
          alt={`photo ${i}`}
          className={cn('productPage__sliderElem', {
            'productPage__sliderElem--active': activePhoto === i,
          })}
        />
      </button>
    );
  });
};
