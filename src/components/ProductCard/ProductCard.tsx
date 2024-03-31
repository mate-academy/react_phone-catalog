import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { BASE_URL } from '../../helpers/constants';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';
import { formatCapacity } from '../../helpers/formatCapacity';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    id,
    category,
    itemId,
  } = product;
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  const { cart, addToCart, deleteProduct } = useContext(CartContext);
  const isFavorite = favorites.some(item => item.id === id);
  const isInCart = cart.some(item => item.id === id);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isInCart) {
      addToCart(product);
    } else {
      deleteProduct(id);
    }
  };

  const handleAddToFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToFavorites(product);
  };

  return (
    <div className="product-card">
      <div className="product-card__content">
        <Link
          to={`/${category}/${itemId}`}
          className="product-card__link"
        >
          <div className="product-card__image-container">
            <img src={`${BASE_URL}${image}`} alt={name} className="product-card__image" />
          </div>
          <p className="product-card__title">{name}</p>
        </Link>
        <div className="product-card__price-container">
          <h3 className="product-card__price">{`$${price}`}</h3>
          {price !== fullPrice && (
            <p className="product-card__full-price">{`$${fullPrice}`}</p>
          )}
        </div>
        <ul className="product-card__specs">
          <li className="product-card__spec">
            <p className="product-card__spec-title">Screen</p>
            <p className="product-card__spec-value">
              {screen.replace("'", '"')}
            </p>
          </li>
          <li className="product-card__spec">
            <p className="product-card__spec-title">Capacity</p>
            <p className="product-card__spec-value">
              {formatCapacity(capacity)}
            </p>
          </li>
          <li className="product-card__spec">
            <p className="product-card__spec-title">RAM</p>
            <p className="product-card__spec-value">
              {formatCapacity(ram)}
            </p>
          </li>
        </ul>
        <div className="product-card__buttons">
          <button
            type="button"
            className={cn('product-card__primary-button button', {
              'button--selected': isInCart,
            })}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={cn('product-card__fav-button', {
              'product-card__fav-button--selected': isFavorite,
            })}
            onClick={handleAddToFavorites}
          >
            <div
              className={cn('icon icon--favorites', {
                'icon--selected-favorites': isFavorite,
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
