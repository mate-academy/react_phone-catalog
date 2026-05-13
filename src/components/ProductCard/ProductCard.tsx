/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './ProductCard.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isInCart = cart.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFavorite(product);
  };

  return (
    <article className="product-card">
      <Link to={`/phones/${product.itemId}`} className="product-card__link">
        <div className="product-card__image-container">
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="product-card__image"
          />
        </div>
        <h3 className="product-card__title">{product.name}</h3>
      </Link>

      <div className="product-card__price">
        <span className="product-card__price-new">{`$${product.price}`}</span>
        {product.fullPrice && (
          <span className="product-card__price-old">{`$${product.fullPrice}`}</span>
        )}
      </div>

      <div className="product-card__divider" />

      <div className="product-card__specs">
        <div className="product-card__spec">
          <span className="product-card__spec-label">Screen</span>
          <span className="product-card__spec-value">{product.screen}</span>
        </div>
        <div className="product-card__spec">
          <span className="product-card__spec-label">Capacity</span>
          <span className="product-card__spec-value">{product.capacity}</span>
        </div>
        <div className="product-card__spec">
          <span className="product-card__spec-label">RAM</span>
          <span className="product-card__spec-value">{product.ram}</span>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          type="button"
          onClick={handleCartClick}
          className={`product-card__btn-cart ${isInCart ? 'is-active' : ''}`}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`product-card__btn-fav ${isFavorite ? 'is-active' : ''}`}
          aria-label="Add to favorites"
        >
          <div className="product-card__icon-heart" />
        </button>
      </div>
    </article>
  );
};
