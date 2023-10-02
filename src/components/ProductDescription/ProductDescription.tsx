/* eslint-disable no-mixed-operators */
import './ProductDescription.scss';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Product, productDescription } from '../../types';
import { Cart } from '../../types/cart';

type Props = {
  productDetails: productDescription;
  product: Product | undefined;
  handleSetCarts: (value:Product) => void;
  carts: Cart[];
  handleSetFavorites: (value:Product) => void;
  favorites: Product[];
};

const noData = (value: string | undefined): string => {
  return value || 'no data';
};

const ButtonClassName = (carts:Cart[], product:Product) => cn(
  'add-button-details',
  { 'add-button-details--added': carts.some(cart => cart.id === product.id) },
);

export const ProductDescription:React.FC<Props> = ({
  productDetails,
  product,
  handleSetCarts,
  carts,
  handleSetFavorites,
  favorites,
}) => {
  const { images } = productDetails;
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="details-container
    product-page-container__details-container"
    >
      <h1 className="title ">{productDetails.name}</h1>
      <div className="images-container details-container__images-container">
        <div className="images-container images-container--small">
          {images.map(image => (
            <button
              key={image}
              type="button"
              className="img-small-button"
              onClick={() => setMainImage(image)}
            >
              <img
                className="img-small"
                src={image}
                alt="#small-img"
              />
            </button>
          ))}
        </div>

        <div className="img-main-container">
          <img
            className=""
            src={mainImage}
            alt="#main-img"
          />
        </div>
      </div>
      {product !== undefined && (
        <div className="price-container details-container__price-container">
          <div className="price">
            {product.discount > 0 ? (
              <>
                <h1 className="title">
                  {`$${product.price - (product.price / 100 * product.discount)}`}
                </h1>
                <h1 className="title__discount">{`$${product.price}`}</h1>
              </>
            ) : (
              <h1 className="title">{`$${product.price}`}</h1>
            )}
          </div>

          <div className="buttons-container-details
              details-container__buttons-container-details "
          >
            <button
              type="button"
              className={ButtonClassName(carts, product)}
              onClick={() => handleSetCarts(product)}
            >
              {carts.some(cart => cart.id === product.id)
                ? 'Added to cart' : 'add to cart'}
            </button>
            <button
              type="button"
              className="favourite-button-details"
              onClick={() => handleSetFavorites(product)}
              data-cy="addToFavorite"
            >
              {favorites.some(favorit => favorit.id === product.id) ? (
                <img src="./img/icons/favorit.svg" alt="#heartlike-added" />
              ) : (
                <img src="./img/icons/heartlike.svg" alt="#heartlike" />
              )}
            </button>
          </div>

          <div className="details-container__details">
            <div className="details card__details">
              <span className="details-description">Screen</span>
              <span
                className="details-description
                    details-description--seccondary"
              >
                {noData(productDetails.display.screenSize
                  .replace(/ inches/g, '"'))}
              </span>
            </div>

            <div className="details card__details">
              <span className="details-description">Resolution</span>
              <span
                className="details-description
                    details-description--seccondary"
              >
                {noData(productDetails.display.screenResolution)}
              </span>
            </div>
            <div className="details card__details">
              <span className="details-description">Capacity</span>
              <span
                className="details-description
                    details-description--seccondary"
              >
                {productDetails.storage.flash ? `${productDetails.storage.flash.slice(0, -2)} ${productDetails.storage.flash.slice(-2)}` : 'no data'}
              </span>
            </div>

            <div className="details card__details">
              <span className="details-description">Ram</span>
              <span
                className="details-description
                    details-description--seccondary"
              >
                {productDetails.storage.ram ? `${productDetails.storage.ram.slice(0, -2)} ${productDetails.storage.ram.slice(-2)}` : 'no data'}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="about details-container__about">
        <h2 className="description-title">About</h2>
        <h3 className="description-subtitle
        about__description-subtitle"
        >
          Description
        </h3>
        <p className="description-text" data-cy="productDescription">
          {productDetails.description}
        </p>

        {productDetails.additionalFeatures && (
          <>
            <h3 className="description-subtitle
          about__description-subtitle"
            >
              Additional features
            </h3>
            <p className="description-text">
              {productDetails.additionalFeatures}
            </p>
          </>
        )}
      </div>

      <div className="tech-specs details-container__about">
        <h2 className="description-title">Tech specs</h2>
        {productDetails !== undefined && (
          <>
            <div className="about__details">
              <div className="details card__details">
                <span className="description-text">Screen</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.display.screenSize
                    .replace(/ inches/g, '"'))}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Resolution</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.display.screenResolution)}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Camera</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.camera.primary)}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Processor</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.hardware.cpu)}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Capacity</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {productDetails.storage.flash ? `${productDetails.storage.flash.slice(0, -2)} ${productDetails.storage.flash.slice(-2)}` : 'no data'}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Ram</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {productDetails.storage.ram ? `${productDetails.storage.ram.slice(0, -2)} ${productDetails.storage.ram.slice(-2)}` : 'no data'}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Android os</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.android.os)}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Android ui</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.android.ui)}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Battery</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.battery.type)}
                </span>
              </div>

              <div className="details card__details">
                <span className="description-text">Weight</span>
                <span
                  className="description-text description-text--seccondary"
                >
                  {noData(productDetails.sizeAndWeight.weight)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
