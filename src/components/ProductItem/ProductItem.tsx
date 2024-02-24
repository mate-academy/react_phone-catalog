import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './ProductItem.scss';
import { Product } from '../../types/Product';
import { Button } from '../Button/Button';
import { usePhones } from '../../hooks/usePhones';

type Props = {
  product: Product
};

export const ProductItem: React.FC<Props> = ({
  product,
}) => {
  const {
    favoritesId,
    cartProducts,
    handleOnCartAdd,
    handleOnLikeClick,
  } = usePhones();

  const {
    itemId,
    image,
    phoneId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const isCartItem = cartProducts.find(({ id }) => id === itemId);

  return (
    <div className="product-item">
      <Link to={`/phones/${phoneId}`}>
        <div className="product-item__img">
          <img src={`_new/${image}`} alt={phoneId} />
        </div>
      </Link>

      <Link
        to={`/phones/${phoneId}`}
        className="product-item__title body-text"
      >
        {name}
      </Link>

      <div className="product-item__price-section">
        <h2 className="price">
          {`$${price}`}
        </h2>

        <p className="price-discount">
          {`$${fullPrice}`}
        </p>
      </div>

      <hr className="product-item__line" />

      <div className="product-item__descr">
        <div className="product-item__descr-wrapper">
          <p className="product-item__descr-name">
            Screen
          </p>

          <p className="product-item__descr-value">
            {screen}
          </p>
        </div>

        <div className="product-item__descr-wrapper">
          <p className="product-item__descr-name">
            Capacity
          </p>

          <p className="product-item__descr-value">
            {capacity}
          </p>
        </div>

        <div className="product-item__descr-wrapper">
          <p className="product-item__descr-name">
            RAM
          </p>

          <p className="product-item__descr-value">
            {ram}
          </p>
        </div>
      </div>

      <div className="product-item__btns">
        <Button
          className={cn(
            'button',
            'button__primary',
            'button--large',
            {
              button__selected: isCartItem,
            },
          )}
          onClick={() => handleOnCartAdd(itemId)}
        >
          {isCartItem ? 'Added to cart' : 'Add to card'}
        </Button>

        <Button
          className="
            button
            button__like
            button--medium
          "
          onClick={() => handleOnLikeClick(itemId)}
        >
          {
            favoritesId?.includes(itemId)
              ? (
                <img src="img/icons/heart-active.svg" alt="Heart" />
              )
              : (
                <img src="img/icons/heart.svg" alt="Heart" />
              )
          }
        </Button>
      </div>
    </div>
  );
};
