import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import { CartContext } from '../../storage/cartContext';
import { PriceContext } from '../../storage/fullPriceСontext';
import { FavouritesContext } from '../../storage/favoritesContext';

import { Phone } from '../../types/phone';

import './productcard.scss';

type Props = {
  product: Phone ;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { isInCart, handleCart } = useContext(CartContext);
  const { isInFavorites, handleFavorites } = useContext(FavouritesContext);
  const isOnlyFullPrice = useContext(PriceContext) || false;

  return (
    <div
      className="product-card"
    >
      <Link to={`/${product.category}/${product.phoneId}`}>
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            src={product.image}
            alt={product.name}
          />
        </div>

        <p className="product-card__title">{product.name}</p>
      </Link>

      <div className="product-card__price-container">
        <span className="product-card__price-new">
          {isOnlyFullPrice
            ? `$${product.fullPrice}`
            : `$${product.price}`}
        </span>

        {!isOnlyFullPrice && (
          <span className="product-card__price-old">
            {`$${product.fullPrice}`}
          </span>
        )}
      </div>

      <div className="product-card__underline" />

      <div className="product-card__description-container">
        <div className="product-card__description-item">
          <span className="product-card__description-title">Screen</span>
          <span className="product-card__description-detail">
            {product.screen}
          </span>
        </div>

        <div className="product-card__description-item">
          <span className="product-card__description-title">Capacity</span>
          <span className="product-card__description-detail">
            {product.capacity}
          </span>
        </div>

        <div className="product-card__description-item">
          <span className="product-card__description-title">RAM</span>
          <span className="product-card__description-detail">
            {product.ram}
          </span>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames('product-card__button-add-cart', {
            'product-card__button-add-cart--added': isInCart(product),
          })}
          onClick={() => handleCart(product)}
        >
          {isInCart(product) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames('product-card__button-favorites', {
            'product-card__button-favorites--added': isInFavorites(product),
          })}
          data-cy="addToFavorite"
          onClick={() => handleFavorites(product)}
        >
          {isInFavorites(product)
            ? <ReactSVG src="img/icons/FavouritesFilled.svg" />
            : <ReactSVG src="img/icons/Favourites.svg" />}
        </button>
      </div>
    </div>
  );
};
