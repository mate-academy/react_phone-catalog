import React from 'react';

import './MainControls.scss';
import { COLOR_HEX } from '../../../utils/COLOR_HEX';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { favouritesFiledImg, favouritesImg } from '../../../utils/indes';
import { ProductDetails } from '../../../types/ProductDetails';
import { UpgradedProduct } from '../../../types/UpgradedProduct';

type Props = {
  pathname: string;
  product: ProductDetails;
  productFromStorage: UpgradedProduct;
  onFavouritesClick: () => void;
  onCartClick: () => void;
};

const MainControls: React.FC<Props> = ({
  product,
  productFromStorage,
  onFavouritesClick,
  onCartClick,
  pathname,
}) => {
  return (
    <div className="mainControls">
      <div className="mainControls__block">
        <div className="mainControls__block-id">
          <p>Available colors</p>
          <p className="mainControls__block-id-desctop">{`ID: ${productFromStorage.id}`}</p>
        </div>
        <div className="mainControls__colors">
          {product.colorsAvailable.map(color => {
            const colorPath = pathname.split('-');

            colorPath.splice(colorPath.length - 1, 1, color);
            const newPath = colorPath.join('-');

            return (
              <Link
                to={newPath}
                key={color}
                className={classNames('mainControls__colors-link', {
                  'mainControls__colors-link-active': product.color === color,
                })}
              >
                <div
                  style={{
                    backgroundColor: COLOR_HEX[color],
                  }}
                  className="mainControls__colors-color"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mainControls__block-line" />
      <div className="mainControls__block">
        <p>Select Capacity</p>
        <div className="mainControls__capacity">
          {product.capacityAvailable.map(capacity => {
            const capacityPath = pathname.split('-');
            const index = capacityPath.findIndex(el =>
              el.match(/[1-9](gb|tb|mm)/i),
            );

            capacityPath.splice(index, 1, capacity.toLowerCase());
            const newPath = capacityPath.join('-');

            return (
              <Link
                to={newPath}
                key={capacity}
                className={classNames('mainControls__capacity-link', {
                  'mainControls__capacity-link-active':
                    product.capacity === capacity,
                })}
              >
                {capacity}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mainControls__block-line" />
      <div className="mainControls__block">
        <div className="mainControls__price">
          <h2 className="mainControls__price-seil">{`$${product.priceDiscount}`}</h2>
          <h2 className="mainControls__price-full">{`$${product.priceRegular}`}</h2>
        </div>
        <div className="mainControls__buttons">
          <button
            className={classNames('mainControls__buttons-cart', {
              'mainControls__buttons-cart-isActive':
                productFromStorage.addedToCart,
            })}
            type="button"
            onClick={onCartClick}
          >
            {productFromStorage.addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="mainControls__buttons-favourite"
            type="button"
            onClick={onFavouritesClick}
          >
            <img
              src={
                productFromStorage.addedToFavourites
                  ? favouritesFiledImg
                  : favouritesImg
              }
              alt="Favourites"
            />
          </button>
        </div>
      </div>
      <ul className="mainControls__description">
        <li className="mainControls__description-list">
          <strong className="mainControls__description-list-name">
            Screen
          </strong>
          <span className="mainControls__description-list-value">
            {product.screen}
          </span>
        </li>
        <li className="mainControls__description-list">
          <strong className="mainControls__description-list-name">
            Resolution
          </strong>
          <span className="mainControls__description-list-value">
            {product.resolution}
          </span>
        </li>
        <li className="mainControls__description-list">
          <strong className="mainControls__description-list-name">
            Processor
          </strong>
          <span className="mainControls__description-list-value">
            {product.processor}
          </span>
        </li>
        <li className="mainControls__description-list">
          <strong className="mainControls__description-list-name">RAM</strong>
          <span className="mainControls__description-list-value">
            {product.ram}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MainControls;
