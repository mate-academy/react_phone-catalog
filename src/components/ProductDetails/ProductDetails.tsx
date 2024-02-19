import { useState } from 'react';
import { ProductDescription } from '../../types/product';
import './ProductDetails.scss';
import { AddToCart } from '../AddToCart';

type Props = {
  product: ProductDescription;
};

const PARAMS: (keyof ProductDescription)[] = [
  'screen', 'resolution', 'processor', 'ram', 'camera', 'zoom', 'cell',
];

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const {
    id,
    images,
    name,
    priceDiscount,
    priceRegular,
    description,
  } = product;

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <section className="details">
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

          <div className="details__buttons">
            <AddToCart id={id} />
          </div>

          <div className="details__params">
            {PARAMS.map((param, i) => {
              if (i > 4) {
                return false;
              }

              const value = product[param] as string;

              return (
                <div className="details__param">
                  <p className="details__param-name">{param}</p>
                  <p className="details__param-value">{value}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <div className="details__box">
        <article className="details__about" data-cy="productDescription">
          <h2>About</h2>

          {description.map(el => (
            <div className="details__description">
              <h3>{el.title}</h3>
              <p className="details__text">{el.text}</p>
            </div>
          ))}
        </article>

        <article className="details__about">
          <h2>Tech specs</h2>

          <div className="details__params">
            {PARAMS.map((param) => {
              const value = product[param] as string;

              return (
                <div className="details__param">
                  <p className="details__param-name">{param}</p>
                  <p className="details__param-value">{value}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};
