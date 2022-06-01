import React, { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import './Galery.scss';

type Props = {
  product: Product;
};

export const Galery: React.FC<Props> = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="galery">
      <ul className="galery__list">
        {product.images.slice(0, 5).map((img, i) => (
          <li
            key={img}
            className="galery__list-item"
          >
            <button
              type="button"
              className={classNames(
                'galery__list-item-button',
                {
                  'galery__list-item-button--is-selected':
                  imageIndex === i,
                },
              )}
              onClick={() => setImageIndex(i)}
            >
              <img
                src={img}
                alt={product.type}
                className="galery__image"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="galery__selected-image-box">
        <img
          className="galery__selected-image"
          src={product.images[imageIndex]}
          alt={product.type}
        />
      </div>
    </div>
  );
};
