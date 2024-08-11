import React, { useContext } from 'react';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductContext } from '../../../shared/Context/ProductContext';
import { COLOR_HEX } from '../../../utils/COLOR_HEX';
import { ActionContext } from '../../../shared/Context/ActionContext';
import './ActionPannel.scss';

type Props = {
  pathname: string;
  product: ProductDetails;
};

export const ActionPannel: React.FC<Props> = ({ product, pathname }) => {
  const { products } = useContext(ProductContext);
  const productFromStorage = products.find(item => item.itemId === product.id);

  const { handleAction, favouritesIds, cartProducts } =
    useContext(ActionContext);

  const onCartClick = () => {
    if (productFromStorage) {
      handleAction(productFromStorage, 'cart');
    }
  };

  const productInTheCard = cartProducts.find(
    item => item.id === productFromStorage?.id,
  );

  const onFavouritesClick = () => {
    if (productFromStorage) {
      if (favouritesIds.includes(productFromStorage.id)) {
        handleAction(productFromStorage, 'removeFromFavourites');
      } else if (!favouritesIds.includes(productFromStorage.id)) {
        handleAction(productFromStorage, 'favourites');
      }
    }
  };

  return (
    <div className="mainControls">
      <div className="mainControls__block">
        <div className="mainControls__block-id">
          <p>Available colors</p>
          <p className="mainControls__block-id-number">{`ID: ${productFromStorage?.id}`}</p>
        </div>
        <div className="mainControls__colors">
          {product.colorsAvailable.map(color => {
            const colorPath = pathname.split('-').filter(x => x !== 'space');
            const normalizedColor = color.split(' ').join('-');

            colorPath.splice(colorPath.length - 1, 1, normalizedColor);
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
            const capacityPath = pathname.split('-').filter(x => x !== 'space');

            capacityPath.splice(
              capacityPath.length - 2,
              1,
              capacity.toLowerCase(),
            );

            capacityPath.pop();

            capacityPath.push(product.color.split(' ').join('-'));

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
        {productFromStorage && (
          <div className="mainControls__buttons">
            <button
              className={classNames('mainControls__buttons-cart', {
                'mainControls__buttons-cart-isActive': productInTheCard,
              })}
              type="button"
              onClick={onCartClick}
            >
              {productInTheCard ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className="mainControls__buttons-favourite"
              type="button"
              onClick={onFavouritesClick}
            >
              <div
                className={classNames('icon icon--favorites', {
                  'icon--favorites--active': favouritesIds.includes(
                    productFromStorage.id,
                  ),
                })}
              ></div>
            </button>
          </div>
        )}
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
