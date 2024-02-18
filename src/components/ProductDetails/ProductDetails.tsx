import { useState } from 'react';
import { ProductDescription } from '../../types/product';
import './ProductDetails.scss';
import { AddToCart } from '../AddToCart';

type Props = {
  product: ProductDescription;
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const {
    id,
    images,
    name,
    priceDiscount,
    priceRegular,
  } = product;

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <article className="details">
      <div className="details__box">
        <div className="details__images">
          <div className="details__previews">
            {images.map(preview => (
              <button
                className="details__preview-box"
                type="button"
                onClick={() => setMainImage(preview)}
              >
                <img
                  src={`_new/${preview}`}
                  alt="preview"
                  className="details__preview-item"
                />
              </button>
            ))}
          </div>

          <div className="details__img-box">
            <img
              src={`_new/${mainImage}`}
              alt={name}
              className="details__img"
            />
          </div>
        </div>

        <div className="details__options">
          <div className="details__price-box">
            <p className="details__discount">{`$${priceDiscount}`}</p>
            <p className="details__price">{`$${priceRegular}`}</p>
          </div>

          <AddToCart id={id} />
        </div>
      </div>
      <div className="details__box">
        s
      </div>
    </article>
  );
};
