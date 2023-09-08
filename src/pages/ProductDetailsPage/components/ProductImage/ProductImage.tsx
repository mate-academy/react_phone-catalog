/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import './ProductImage.scss';
import classNames from 'classnames';

type Props = {
  images: string[],
};

export const ProductImage: React.FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="product-image">
      <div className="product-image__thumbs">
        {images.map((image, ind) => (
          <div
            key={image}
            className={classNames('product-image__thumb-container', {
              'product-image__thumb-container--selected': selected === ind,
            })}
          >
            <img
              alt={image}
              src={`/_new/${image}`}
              className="product-image__img"
              onClick={() => setSelected(ind)}
            />
          </div>
        ))}
      </div>

      <div className="product-image__full-img-container">
        <img
          src={`/_new/${images[selected]}`}
          alt={images[0]}
          className="product-image__full-img"
        />
      </div>
    </div>

  );
};
