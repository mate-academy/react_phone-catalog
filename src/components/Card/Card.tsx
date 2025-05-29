import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import React from 'react';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCartValues();
  const { favourites, addToFavourite, removeFromFavourite } =
    useFavouriteValues();

  // const location = useLocation();
  // const root = location.pathname.split('/')[1];

  const createLink = () => {
    return `/${product.category}/${product.itemId}`;
  };

  const isAddedToCart = cart.some(item => item.product.id === product.id);

  const isAddedToFavourites = favourites.some(
    item => item.product.id === product.id,
  );

  return (
    <div className="card">
      <Link to={createLink()}>
        <img src={product.image} alt={product.name} className="card__img" />
      </Link>
      <Link to={createLink()}>
        <h3 className="card__title">{product.name}</h3>
      </Link>
      <div className="card__prices">
        <p className="card__prices--price">${product.price}</p>
        <p className="card__prices--fullprice">${product.fullPrice}</p>
      </div>

      <hr className="divider"></hr>

      <ul className="card__description">
        <li className="card__description--item">
          <p className="card__description__item--name">Screen</p>
          <p className="card__description__item--value">{product.screen}</p>
        </li>

        <li className="card__description--item">
          <p className="card__description__item--name">Capacity</p>
          <p className="card__description__item--value">{product.capacity}</p>
        </li>

        <li className="card__description--item">
          <p className="card__description__item--name">RAM</p>
          <p className="card__description__item--value">{product.ram}</p>
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
            <img
              src="./img/favourite-icon-selected.svg"
              alt="favourite icon"
              className="icon icon-user favourite__added"
            />
          </Link>
        ) : (
          <Link
            to=""
            className="card__actions--btn card__favourite"
            onClick={() => addToFavourite(product)}
          >
            <img
              src="./img/favourite-icon.svg"
              alt="favourite icon"
              className="icon icon-user favourite__added"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
