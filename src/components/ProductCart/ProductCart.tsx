import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FavContext } from '../../context/FavContext';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/fetchClient';
import './ProductCart.scss';

type Props = {
  product: Product,
};

export const ProductCart: React.FC<Props> = ({ product }) => {
  const { cart, handleAddToCart } = useContext(CartContext);
  const { fav, handleAddToFav } = useContext(FavContext);

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
  } = product;

  const isAddedToCart = cart.some(item => item === product.itemId);
  const isAddedToFav = fav.some(item => item === product.itemId);

  return (
    <div className="ProductCart">
      <Link to={`/${category}/${itemId}`} className="ProductCart__link">
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
          <div className="ProductCart__line" />
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
              {capacity}
            </span>
          </li>

          <li className="ProductCart__feature">
            <span className="ProductCart__feature-name">
              RAM
            </span>
            <span className="ProductCart__feature-value">
              {ram}
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
          onClick={() => handleAddToCart(product.itemId)}
        >
          {isAddedToCart ? (
            'Added to cart'
          ) : (
            'Add to cart'
          )}
        </button>
        <button
          type="button"
          aria-label="Like"
          className={classNames('button button--like', {
            'button--like-active': isAddedToFav,
          })}
          onClick={() => handleAddToFav(product.itemId)}
        />
      </div>
    </div>
  );
};
