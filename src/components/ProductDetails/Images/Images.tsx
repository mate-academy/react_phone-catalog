/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useState } from 'react';
import { getImgUrl, getProductImages } from '../../../helpers/getFunctions/details';
import { DetailType } from '../../../helpers/types/DetailType';
import './Images.scss';

type Props = {
  product: DetailType,
};

export const Images: React.FC<Props> = ({ product }) => {
  const { images: imgs } = product;
  const urlImg = getImgUrl(product);
  const images = getProductImages(imgs.length, urlImg);

  const [selectedImg, setSelectedImg] = useState(images[0]);

  return (
    <div className="images">
      <div className="images__wrapper">
        {images.map(image => (
          <button
            type="button"
            className={classNames('images__button', {
              'images__button--active': selectedImg === image,
            })}
            key={image}
            onClick={() => setSelectedImg(image)}
          >
            <img
              src={image}
              alt="img"
              key={image}
              className="images__image"
            />
          </button>
        ))}
      </div>

      <img
        src={selectedImg}
        alt="img"
        className="images__image images__image--big"
      />
    </div>
  );
};
