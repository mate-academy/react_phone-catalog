import { useState } from 'react';

import './ProductGallery.scss';
import classNames from 'classnames';

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      <ul className="product-gallery__slides">
        {images.map(image => (
          <li key={image}>
            <button
              className={classNames('product-gallery__button', {
                'product-gallery__button--active': image === selectedImage,
              })}
              type="button"
              onClick={() => setSelectedImage(image)}
            >
              <img
                className="product-gallery__slide-image"
                src={`_new/${image}`}
                alt=""
              />
            </button>
          </li>
        ))}
      </ul>

      {selectedImage && (
        <div className="product-gallery__wrapper">
          <img
            className="product-gallery__selected-image"
            src={`_new/${selectedImage}`}
            alt={name}
          />
        </div>
      )}
    </div>
  );
};
