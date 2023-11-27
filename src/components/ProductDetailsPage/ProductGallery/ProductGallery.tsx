import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/UI';
import './ProductGallery.scss';

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [counter, setCounter] = useState(images.length);

  useEffect(() => {
    setSelectedImage(null);

    if (counter === 0) {
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
                src={image}
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
            src={selectedImage}
            alt={name}
          />
        ) : (
          <Loader width={150} />
        )}
      </div>
    </div>
  );
};
