import './ProductCard.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { FavouriteContext } from '../../contexts/FavoriteContext';
import { CartContext } from '../../contexts/CartContext';

interface Props {
  product: Product,
  translateDistance?: number,
}

export const ProductCard: React.FC<Props> = ({
  product,
  translateDistance = 0,
}) => {
  const { favourites, handleAddToFav } = useContext(FavouriteContext);
  const { cart, handleAddToCart } = useContext(CartContext);
  const isFavourite = favourites.some(f => f.id === product.id);
  const isInCart = cart.some(c => c.id === product.id);

  const handleAddToFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleAddToFav(product);
  };

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleAddToCart(product);
  };

  return (
    <Link
      to={`/phones/${product.itemId}`}
      className="product"
      style={{
        transform: `translateX(-${translateDistance}px)`,
        transitionDuration: '1s',
        transitionProperty: 'transform',
      }}
    >
      <img
        src={`/_new/${product.image}`}
        className="product__image"
        alt={product.name}
      />

      <div className="product__content">
        <div className="product__title">
          <p className="product__name">
            {product.name}
          </p>
        </div>

        <div className="product__prices">
          <h2
            className="product__price"
          >
            {`$${product.price}`}
          </h2>

          <h2
            className="product__full-price"
          >
            {`$${product.fullPrice}`}
          </h2>
        </div>

        <div className="product__line" />

        <div className="product__row">
          <p className="product__characteristic">Screen</p>
          <p className="product__value">{product.screen}</p>
        </div>

        <div className="product__row">
          <p className="product__characteristic">Capacity</p>
          <p className="product__value">{product.capacity}</p>
        </div>

        <div className="product__row product__row--last">
          <p className="product__characteristic">RAM</p>
          <p className="product__value">{product.ram}</p>
        </div>

        <div className="product__buttons">
          <button
            type="button"
            className={classNames('product__button product__button--big', {
              'product__button--added': isInCart,
            })}
            onClick={handleAddToCartClick}
          >
            {isInCart
              ? 'Added to cart'
              : 'Add to cart'}
          </button>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="product__button product__button--small"
            onClick={handleAddToFavClick}
          >
            {isFavourite
              ? <i className="icon icon--favourites-added" />
              : <i className="icon icon--favourites" />}
          </button>
        </div>
      </div>
    </Link>
  );
};
