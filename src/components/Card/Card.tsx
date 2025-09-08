import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCartValues();
  const { favourites, addToFavourite, removeFromFavourite } =
    useFavouriteValues();

  const createLink = () => {
    return `/product/${product.itemId}`;
  };

  const productItemId = product.itemId || product.id;
  const isAddedToCart = cart.some(
    item =>
      item.product &&
      (item.product.itemId || item.product.id) === productItemId,
  );
  const isAddedToFavourites = favourites.some(
    item =>
      item.product &&
      (item.product.itemId || item.product.id) === productItemId,
  );

  const imageSrc = product.image
    ? `/${product.image}`
    : product.images && product.images.length > 0
      ? `/${product.images[0]}`
      : '/img/page-not-found.png';

  const price = product.price ?? product.priceDiscount ?? '';
  const fullPrice = product.fullPrice ?? product.priceRegular ?? '';

  return (
    <div className="card">
      <Link to={createLink()}>
        <img src={imageSrc} alt={product.name} className="card__img" />
      </Link>
      <Link to={createLink()}>
        <h3 className="card__title">{product.name}</h3>
      </Link>
      <div className="card__prices">
        <p className="card__prices--price">{price ? `$${price}` : '$$'}</p>
        <p className="card__prices--fullprice">
          {fullPrice ? `$${fullPrice}` : ''}
        </p>
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
          <button
            type="button"
            className="card__actions--btn card__add"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        ) : (
          <button
            type="button"
            className="card__actions--btn card__added"
            onClick={() => removeFromCart(product)}
          >
            Added
          </button>
        )}

        {isAddedToFavourites ? (
          <button
            type="button"
            className="card__actions--btn card__favourite selected"
            onClick={() => removeFromFavourite(product)}
          >
            <img
              src="/img/favourite-icon-selected.png"
              alt="favourite icon"
              className="icon icon-user favourite__added"
            />
          </button>
        ) : (
          <button
            type="button"
            className="card__actions--btn card__favourite"
            onClick={() => addToFavourite(product)}
          >
            <img
              src="/img/favourite-icon.png"
              alt="favourite icon"
              className="icon icon-user"
            />
          </button>
        )}
      </div>
    </div>
  );
};
