import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/fetchClient';
import './ProductCart.scss';

type Props = {
  newProduct: Product,
  sliderCard?: string,
};

export const ProductCart: React.FC<Props> = ({
  newProduct,
  sliderCard = '',
}) => {
  const { cart, handleAddToCart } = useCart();
  const { fav, handleAddToFav } = useFav();

  const isAddedToCart = cart
    .find(item => item.product.itemId === newProduct.itemId);
  const isAddedToFav = fav.find(item => item.itemId === newProduct.itemId);

  const {
    image,
    name,
    category,
    itemId,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = newProduct;

  return (
    <li className={classNames('ProductCart', {
      'ProductCart--slider': sliderCard,
    })}
    >
      <Link
        to={`/${category}/${itemId}`}
        className="ProductCart__link"
      >
        <div className="ProductCart__image-container">
          <img
            src={`${BASE_URL}/${image}`}
            alt={name}
            className="ProductCart__image"
          />
        </div>

        <div className="ProductCart__info">
          <h2 className="ProductCart__name">
            {name}
          </h2>
          <div className="ProductCart__prices">
            <span className="ProductCart__new-price">
              &#36;
              {price}
            </span>
            <span className="ProductCart__full-price">
              &#36;
              {fullPrice}
            </span>
          </div>
          <div className="Decorative-line" />
        </div>

        <ul className="ProductCart__features">
          <li className="ProductCart__feature">
            <span className="ProductCart__feature-name">
              Screen
            </span>
            <span className="ProductCart__feature-value">
              {screen}
            </span>
          </li>

          <li className="ProductCart__feature">
            <span className="ProductCart__feature-name">
              Capacity
            </span>
            <span className="ProductCart__feature-value">
              {capacity.replace('GB', ' GB')}
            </span>
          </li>

          <li className="ProductCart__feature">
            <span className="ProductCart__feature-name">
              RAM
            </span>
            <span className="ProductCart__feature-value">
              {ram.replace('GB', ' GB')}
            </span>
          </li>
        </ul>
      </Link>

      <div className="ProductCart__buttons">
        <button
          type="button"
          className={classNames('button__add-to-cart', {
            'button__added-to-cart': isAddedToCart,
          })}
          onClick={() => handleAddToCart(newProduct)}
        >
          {isAddedToCart ? (
            'Added to cart'
          ) : (
            'Add to cart'
          )}
        </button>
        <button
          type="button"
          aria-label="Favorite"
          data-cy="addToFavorite"
          className={classNames('button button--fav', {
            'button--fav-active': isAddedToFav,
          })}
          onClick={() => handleAddToFav(newProduct)}
        />
      </div>
    </li>
  );
};
