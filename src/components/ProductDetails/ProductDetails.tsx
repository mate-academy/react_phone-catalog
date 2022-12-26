import { FC } from 'react';
import { Product } from '../../types/Product';
import { Details } from '../../types/Details';
import { getPriceWithDiscount } from '../../helpers/getPriceWithDiscount';
import { ProductImages } from './ProductImages/ProductImages';
import { ToCardButton } from '../UI/ToCardButton';
import { ToFavoritesButton } from '../UI/ToFavoritesButton';
import { BackButton } from '../UI/BackButton';
import './ProductDetails.scss';
import { Breadcrumbs } from '../Breadcrumbs';

type Props = {
  product: Product | undefined;
  productDetails: Details | null;
  availableColors: string[];
  availableCapacity: string[];
};

export const ProductDetails: FC<Props> = (
  {
    product,
    productDetails,
    availableColors,
    availableCapacity,
  },
) => {
  const totalPrice = product?.price && getPriceWithDiscount(
    product?.price, product?.discount,
  );

  return (
    <div className="product-details">
      <Breadcrumbs
        currentPage={productDetails?.name || ''}
        productType={product?.type || null}
      />
      <BackButton />
      <h1 className="product-details__title">
        {productDetails?.name}
      </h1>
      <div className="product-details__content">
        <div className="product-details_img-container">
          {productDetails?.images && (
            <ProductImages images={productDetails.images} />
          )}
        </div>
        <div className="product-details__info-container">
          <div className="product-details__info">
            <div className="product-details__colors-container">
              <span className="product-details__label">
                Available colors
              </span>
              <div className="product-details__colors">
                {availableColors.map(color => (
                  <div
                    key={color}
                    className="product-details__color"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="product-details__capacity-container">
              <span className="product-details__label">
                Select capacity
              </span>
              <div className="product-details__capacity-buttons">
                {availableCapacity.map(capacity => (
                  <button
                    key={capacity}
                    type="button"
                    className="product-details__capacity"
                  >
                    {`${capacity} GB`}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-details__price">
              <span className="product-details__total-price">{`$${totalPrice}`}</span>
              <span className="product-details__full-price">{`$${product?.price}`}</span>
            </div>
            <div className="product-details__actions">
              {product !== undefined && (
                <>
                  <ToCardButton
                    product={product}
                    width="263px"
                    height="48px"
                  />
                  <ToFavoritesButton
                    product={product}
                    width="48px"
                    height="48px"
                  />
                </>
              )}
            </div>
            <div className="product-details__short-info-container">
              <div className="product-details__short-info">
                <span className="product-details__label">Screen</span>
                <span className="product-details__value">
                  {productDetails?.display.screenSize}
                </span>
              </div>
              <div className="product-details__short-info">
                <span className="product-details__label">Resolution</span>
                <span className="product-details__value">
                  {productDetails?.display.screenResolution}
                </span>
              </div>
              <div className="product-details__short-info">
                <span className="product-details__label">RAM</span>
                <span className="product-details__value">
                  {productDetails?.storage.ram}
                </span>
              </div>
              <div className="product-details__short-info">
                <span className="product-details__label">Weight</span>
                <span className="product-details__value">
                  {productDetails?.sizeAndWeight.weight}
                </span>
              </div>
            </div>
          </div>
          <div className="product-details__id">
            {`ID: ${productDetails?.id}`}
          </div>
        </div>
      </div>
      <div className="product-details__additional">
        <div data-cy="productDescription" className="product-details__about">
          <h2 className="product-details__additional-header">
            About
          </h2>
          <p className="product-details__about-description">
            {productDetails?.description}
          </p>
        </div>
        <div className="product-details__tech">
          <h2 className="product-details__additional-header">
            Tech specs
          </h2>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">Screen</span>
            <span className="product-details__tech-description">
              {productDetails?.display.screenSize}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">Resolution</span>
            <span className="product-details__tech-description">
              {productDetails?.display.screenResolution}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">RAM</span>
            <span className="product-details__tech-description">
              {productDetails?.storage.ram}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">Weight</span>
            <span className="product-details__tech-description">
              {productDetails?.sizeAndWeight.weight}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">Camera</span>
            <span className="product-details__tech-description">
              {productDetails?.camera.primary}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">Bluetooth</span>
            <span className="product-details__tech-description">
              {productDetails?.connectivity.bluetooth}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">USB</span>
            <span className="product-details__tech-description">
              {productDetails?.hardware.usb}
            </span>
          </div>
          <div className="product-details__tech-container">
            <span className="product-details__tech-label">Wi-Fi</span>
            <span className="product-details__tech-description">
              {productDetails?.connectivity.wifi}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
