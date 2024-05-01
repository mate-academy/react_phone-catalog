import React, { useEffect, useState } from 'react';
import { LOCAL_URL } from '../../api/apiProducts';

import './ProductPhotos.scss';
import { useParams } from 'react-router-dom';
import { Swiper } from '../../helpers/swiper';
import classNames from 'classnames';

type Props = {
  images: string[];
};

export const ProductPhotos: React.FC<Props> = ({ images }) => {
  const [transform, setTransform] = useState(0);
  const [mainPhoto, setMainPhoto] = useState(images[0]);
  const { productID } = useParams();

  const handleSlideChange = (i: number) => {
    if (i === images.indexOf(mainPhoto)) {
      return;
    }

    setTransform(100 * i);
    setMainPhoto(images[i]);
  };

  const { handleTouchStart, handleTouchMove } = Swiper(
    handleSlideChange,
    images.length - 1,
  );

  useEffect(() => {
    setMainPhoto(images[0]);
    setTransform(0);
  }, [productID]);

  return (
    <div
      className="product-photos"
      onTouchStart={handleTouchStart}
      onTouchMove={e => handleTouchMove(e, images.indexOf(mainPhoto))}
    >
      <div className="product-photos__slider-container">
        {images.map((image, i) => (
          <div
            key={image}
            className="product-photos__photo-container"
            style={{ transform: `translateX(-${transform}%)` }}
          >
            <img
              src={`${LOCAL_URL}/${image}`}
              alt={`0${i}`}
              className="product-photos__photo"
            />
          </div>
        ))}
      </div>

      <div className="product-photos__buttons">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            className={classNames('product-photos__button', {
              'product-photos__button--active': image === mainPhoto,
            })}
            onClick={() => handleSlideChange(i)}
          >
            <img src={image} alt={`0${i}`} className="product-photos__photo" />
          </button>
        ))}
      </div>
    </div>
  );
};
