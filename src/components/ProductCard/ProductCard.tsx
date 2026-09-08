import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cartSlice } from '../../features/cart';
import { favouriteSlice } from '../../features/favourite';
import classNames from 'classnames';

interface Props {
  product: Product;
  withFullPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  withFullPrice = false,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourite = useAppSelector(state => state.favourite);
  const isInCart = cart.find((item: Product) => item.id === product.id);
  const isFavourite = favourite.find((item: Product) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(cartSlice.actions.deleteFromCart(product));

      return;
    }

    dispatch(cartSlice.actions.addToCart(product));
  };

  const handleAddToFavourite = () => {
    if (isFavourite) {
      dispatch(favouriteSlice.actions.removeFromFavourite(product));

      return;
    }

    dispatch(favouriteSlice.actions.addToFavourite(product));
  };

  return (
    <article className="product-card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__image-container"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image-container__image"
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__title"
      >
        {product.name}
      </Link>

      <h3 className="product-card__price">
        ${product.price}
        {withFullPrice && (
          <span className="product-card__price__full-price">
            ${product.fullPrice}
          </span>
        )}
      </h3>

      <hr className="divider"></hr>

      <ul className="product-card__description">
        <li className="product-card__description__item">
          <span className="product-card__description__item__name">Screen</span>
          <span className="product-card__description__item__value">
            {product.screen}
          </span>
        </li>
        <li className="product-card__description__item">
          <span className="product-card__description__item__name">
            Capacity
          </span>
          <span className="product-card__description__item__value">
            {product.capacity}
          </span>
        </li>
        <li className="product-card__description__item">
          <span className="product-card__description__item__name">Ram</span>
          <span className="product-card__description__item__value">
            {product.ram}
          </span>
        </li>
      </ul>

      <div className="product-card__actions">
        <button
          className={classNames('product-card__actions__add', {
            'product-card__actions__add--selected': isInCart,
          })}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
        <div
          className={classNames('product-card__actions__favourite', {
            'product-card__actions__favourite--selected': isFavourite,
          })}
          onClick={handleAddToFavourite}
        >
          {isFavourite ? (
            <img src="./img/icons/heart-filled.svg" alt="Favourite" />
          ) : (
            <img src="./img/icons/favourites-heart.svg" alt="Favourite" />
          )}
        </div>
      </div>
    </article>
  );
};
