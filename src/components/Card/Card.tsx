import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import './Card.module.scss';
import { useCartValues } from '../../store/CartContext';
import { useFavouriteValues } from '../../store/FavouriteContext';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCartValues();
  const { favourites, addToFavourite, removeFromFavourite } =
    useFavouriteValues();

  const location = useLocation();
  const root = location.pathname.split('/')[1];

  const createLinkToPhone = () => {
    if (!root) {
      return `phones/${product.itemId}`;
    }

    return `/${root}/${product.itemId}`;
  };

  const isAddedToFavourites = favourites.some(
    item => item.product.id === product.id,
  );

  const isAddedToCart = cart.some(item => item.product.id === product.id);

  return (
    <div className="card">
      <Link to={createLinkToPhone()}>
        <img src={product.image} alt={product.name} className="card__img" />
      </Link>
      <Link to={`${product.itemId}`}>
        <h3 className="card__title">{product.name}</h3>
      </Link>
      <div className="card__prices">
        <p className="card__prices--price">${product.price}</p>
        <p className="card__prices--fullprice">${product.fullPrice}</p>
      </div>

      <hr className="divider"></hr>

      <ul className="card__description">
        <li className="card__description__item">
          <span className="card__description__item--name">Screen</span>
          <span className="card__description__item--value">
            {product.screen}
          </span>
        </li>
        <li className="card__description__item">
          <span className="card__description__item--name">Capacity</span>
          <span className="card__description__item--value">
            {product.capacity}
          </span>
        </li>
        <li className="card__description__item">
          <span className="card__description__item--name">RAM</span>
          <span className="card__description__item--value">{product.ram}</span>
        </li>
      </ul>
      <div className="card__actions">
        {!isAddedToCart ? (
          <Link
            to=""
            className="card__actions--btn card__add"
            onClick={() => addToCart(product)}
          >
            Add to card
          </Link>
        ) : (
          <Link
            to=""
            className="card__actions--btn card__added"
            onClick={() => removeFromCart(product)}
          >
            Added
          </Link>
        )}

        {isAddedToFavourites ? (
          <Link
            to=""
            className="card__actions--btn card__favourite"
            onClick={() => removeFromFavourite(product)}
          >
            <svg className="icon icon-user">
              <use
                href="img/icons.svg#icon-favourites-filled"
                className="favourite__added"
              ></use>
            </svg>
          </Link>
        ) : (
          <Link
            to=""
            className="card__actions--btn card__favourite"
            onClick={() => addToFavourite(product)}
          >
            <svg className="icon icon-user">
              <use href="img/icons.svg#icon-favourites"></use>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};
