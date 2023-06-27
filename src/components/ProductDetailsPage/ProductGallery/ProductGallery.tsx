import { useState, useEffect } from 'react';

import './ProductGallery.scss';
import classNames from 'classnames';
import { Loader } from '../../UI/Loader/Loader';

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [counter, setCounter] = useState(images.length);

  useEffect(() => {
    if (counter < 2) {
      setSelectedImage(images[0]);
    }
  }, [counter]);

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
                onLoad={() => setCounter(prevCounter => prevCounter - 1)}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="product-gallery__wrapper">
        {selectedImage ? (
          <img
            key={selectedImage}
            className="product-gallery__selected-image"
            src={`_new/${selectedImage}`}
            alt={name}
          />
        ) : (
          <Loader width={150} />
        )}
      </div>
    </div>
  );
};
