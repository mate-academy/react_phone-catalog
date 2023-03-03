import React, { useState } from 'react';
import './ProductDetails.scss';
import { Product, ProductDet } from '../../types/Product';

import { Button } from '../Button/Button';
import { ButtonFavourite } from '../ButtonFavourive/ButtonFavourite';

type Props = {
  productDetails: ProductDet | undefined;
  selectedProduct: Product;
};

export const ProductDetails: React.FC<Props> = ({
  productDetails,
  selectedProduct,
}) => {
  const newPrice = selectedProduct?.discount > 0
    ? selectedProduct.price
      - (selectedProduct.price * selectedProduct.discount) / 100
    : selectedProduct.price;
  const [
    currentPhoto, setCurrentPhoto,
  ] = useState<string | undefined>(productDetails?.images[0]);

  const changePhoto = (photo: string) => {
    setCurrentPhoto(photo);
  };

  return (
    <div className="product-details">
      <div className="grid">
        <div className="grid__item grid__item--1-2">
          {productDetails?.images.map(image => (
            <div
              className="product-details__image-wrapper"
              key={image}
              onClick={() => changePhoto(image)}
              aria-hidden="true"
            >
              <img
                src={image}
                alt={productDetails.name}
                className="product-details__image"
              />
            </div>
          ))}
        </div>

        <div className="grid__item grid__item--4-11">
          <div className="product-details__image-wrapper--main">
            <img
              src={currentPhoto}
              alt={productDetails?.name}
              className="product-details__image"
            />
          </div>
        </div>

        <div className="grid__item grid__item--14-20">

          <div className="product-details__prices">
            <span className="product-details__new-price">
              {`$${newPrice}`}
            </span>
            {selectedProduct.discount > 0 && (
              <span className="product-details__old-price">
                {`$${selectedProduct.price}`}
              </span>
            )}
          </div>

          <div className="product-details__buttons-wrapper">
            <Button product={selectedProduct} isBigButton />

            <ButtonFavourite product={selectedProduct} isBigButton />
          </div>

          <div className="product-details__characteristics">
            <div className="product-details__characteristic">
              <span className="product-details__text">
                Screen
              </span>
              <span className="
                product-details__characteristic-value product-details__text"
              >
                {selectedProduct.screen}
              </span>
            </div>

            <div className="product-details__characteristic">
              <span className="product-details__text">
                Resolution
              </span>
              <span className="
                product-details__characteristic-value product-details__text"
              >
                {productDetails?.display.screenResolution}
              </span>
            </div>

            <div className="product-details__characteristic">
              <span className="product-details__text">
                Processor
              </span>
              <span className="
                product-details__characteristic-value product-details__text"
              >
                processor
              </span>
            </div>

            <div className="product-details__characteristic">
              <span className="product-details__text">RAM</span>
              <span className="
                product-details__characteristic-value product-details__text"
              >
                {productDetails?.storage.ram}
              </span>
            </div>
          </div>
        </div>

        <div className="grid__item grid__item--23-24">
          <div className="product-details__text product-details__id">
            {`ID: ${selectedProduct.id}`}
          </div>
        </div>

        <div
          className="grid__item grid__item--1-12"
          data-cy="productDescription"
        >
          <h2 className="product-details__description-title">
            About
          </h2>

          <p className="product-details__description-text">
            {productDetails?.description}
          </p>
        </div>

        <div className="grid__item grid__item--14-24">
          <h2 className="product-details__description-title">
            Tech specs
          </h2>

          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              Screen
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              {selectedProduct.screen}
            </span>
          </div>
          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              Resolution
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              {productDetails?.display.screenResolution}
            </span>
          </div>

          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              OS
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              {productDetails?.android.os}
            </span>
          </div>

          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              Processor
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              processor
            </span>
          </div>

          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              Weight
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              {productDetails?.sizeAndWeight.weight}
            </span>
          </div>
          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              Battery type
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              {productDetails?.battery.type}
            </span>
          </div>
          <div className="product-details__characteristic">
            <span className="product-details__description-text">
              Cell
            </span>
            <span className="
              product-details__description-text
              product-details__description-text--primary"
            >
              {productDetails?.connectivity.cell}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
