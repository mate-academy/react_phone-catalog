import { useEffect, useState } from 'react';

import './ProductDetails.scss';
import { AddToCart } from '../AddToCart';
import { ProductDescription } from '../../types/product';
import { CartItemType } from '../../types/cart';

type Props = {
  product: ProductDescription;
};

const PARAMS: (keyof ProductDescription)[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const {
    images = [],
    name,
    priceDiscount = 0,
    priceRegular = 0,
    description = [],
  } = product;

  const cartItemData: CartItemType = {
    itemId: product.id,
    name,
    image: images[0],
    price: priceDiscount,
    quantity: 1,
  };

  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <section className="details">
      <div className="details__box">
        <div className="details__images">
          <div className="details__previews">
            {images.map(preview => (
              <button
                key={preview}
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
            <AddToCart product={cartItemData} />
          </div>

          <div className="details__params">
            {PARAMS.map((param, i) => {
              if (i > 4) {
                return false;
              }

              const value = product[param] as string;

              return (
                <div className="details__param" key={param}>
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
            <div className="details__description" key={el.title}>
              <h3>{el.title}</h3>
              <p className="details__text">{el.text}</p>
            </div>
          ))}
        </article>

        <article className="details__about">
          <h2>Tech specs</h2>

          <div className="details__params">
            {PARAMS.map(param => {
              const value = product[param] as string;

              return (
                <div className="details__param" key={param}>
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
