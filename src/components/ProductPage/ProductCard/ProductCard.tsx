import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { FavProductsContext } from '../../Favourite/FavProductsContext';
import { CartContext } from '../../Cart/CartContext';
import './ProductCard.scss';

type Props = {
  type: string;
  product: ProductItem;
};

export const ProductCard: React.FC<Props> = ({
  type,
  product,
}) => {
  const {
    id,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;
  const { addToFav, removeFav, isFavourite } = useContext(FavProductsContext);
  const { addToCart, removeFromCart, isAdded } = useContext(CartContext);

  return (
    <Link to={`/${type}s/${id}`}>
      <div className="products__card card">
        <img className="card__img" src={imageUrl} alt="products img" />
        <div className="card__infoWrap">
          <div className="card__title">{name}</div>
          <h2 className="card__price card__price--discount">
            $
            {(price - price * (discount / 100))}
            {' '}
            {discount !== 0
              && (
                <span className="card__price card__price--full">
                  $
                  {price}
                </span>
              )}
          </h2>

          <div className="card__details details">
            <div className="details__info">
              <div className="details__info--name">Screen</div>
              <div className="details__info--value">{screen}</div>
            </div>
            <div className="details__info">
              <div className="details__info--name">Capacity</div>
              <div className="details__info--value">{capacity}</div>
            </div>
            <div className="details__info">
              <div className="details__info--name">RAM</div>
              <div className="details__info--value">{ram}</div>
            </div>
          </div>
          <div className="card__buttons button">
            <button
              className={isAdded(product)
                ? 'button__cart button__cart--added'
                : 'button__cart'}
              type="button"
              onClick={() => {
                if (isAdded(product)) {
                  removeFromCart(product);
                } else {
                  addToCart(product);
                }
              }}
            >
              {isAdded(product) ? 'Remove from cart' : 'Add to cart'}
            </button>
            <label
              className={isFavourite(product)
                ? 'button__favorite button__favorite--checked'
                : 'button__favorite'}
              htmlFor={`button__favorite--${id}`}
            >
              <input
                className="button__favorite--input"
                type="checkbox"
                checked={isFavourite(product)}
                id={`button__favorite--${id}`}
                onChange={(event) => {
                  if (event.target.checked) {
                    addToFav(product);
                  } else {
                    removeFav(product);
                  }
                }}
              />
            </label>

          </div>
        </div>
      </div>
    </Link>
  );
};
