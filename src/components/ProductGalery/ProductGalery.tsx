import React, { useState } from 'react';
import classNames from 'classnames';
import './ProductGalery.scss';

type Props = {
  image?: string[];
};

export const ProductGalery: React.FC<Props> = ({ image = [] }) => {
  const [selectImg, setSelectImg] = useState(image[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageClick = (img: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectImg(img);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="galery">
      <div className="
        galery__cards
        grid__item--tablet-1-1
        grid__item--desktop-1-2"
      >
        {image.map((img) => (
          <button
            key={img}
            aria-label="img"
            type="button"
            className={classNames('galery__button', {
              'galery__button--active': selectImg === img,
            })}
            onClick={() => handleImageClick(img)}
          >
            <img
              src={`https://mate-academy.github.io/react_phone-catalog/_new/${img}`}
              alt="galery"
              className="galery__img"

            />
          </button>
        ))}
      </div>
      <div className="
        galery__photo
        grid__item--tablet-2-7
        grid__item--desktop-3-12"
      >
        <img
          className={classNames(
            'galery__main', { 'galery__main--transition': isTransitioning },
          )}
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${selectImg}`}
          alt="selected"
        />
      </div>
    </div>
  );
};
