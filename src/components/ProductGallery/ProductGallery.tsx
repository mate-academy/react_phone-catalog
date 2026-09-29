import React, { useState } from 'react';
import classNames from '../../utils/classNames';
import './ProductGallery.scss';
import { publicPath } from '../../utils/publicPath';

interface Props {
  images: string[];
  alt: string;
}

export const ProductGallery: React.FC<Props> = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="product-gallery">
      <ul className="product-gallery__thumbs">
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              aria-label={`Show photo ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={classNames('product-gallery__thumb', {
                'product-gallery__thumb--active': index === activeIndex,
              })}
            >
              <img
                src={publicPath(image)}
                alt=""
                className="product-gallery__thumb-image"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="product-gallery__main">
        <img
          src={publicPath(images[activeIndex])}
          alt={alt}
          className="product-gallery__main-image"
        />
      </div>
    </div>
  );
};
