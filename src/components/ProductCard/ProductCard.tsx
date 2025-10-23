import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

type ProductCardProps = {
  product: Product;
  hideDiscount?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({ product, hideDiscount }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCart, isInCart } = useCart();

  const id = product.itemId;

  const handleToggleCart = useCallback(() => {
    toggleCart({ ...product, id });
  }, [toggleCart, product, id]);

  return (
    <>
      <div className="product-card">
        <Link to={`/${product.category}/${product.itemId}`}>
          <div className="product-card__image-container">
            <img
              className="product-card__image"
              src={`${product.image}`}
              alt="Product Image"
            />
          </div>
        </Link>
        <div className="product-card__details">
          <h2 className="product-card__title">{product.name}</h2>
          <p className="product-card__price">
            {hideDiscount ? (
              `$${product.fullPrice}`
            ) : (
              <>
                ${product.price ?? product.fullPrice}
                {product.price && (
                  <span className="product-card__discount-price">
                    ${product.fullPrice}
                  </span>
                )}
              </>
            )}
          </p>

          <div className="product-card__tags">
            <span className="product-card__tag">
              Screen:{' '}
              <span className="product-card__tag-info">{product.screen}</span>
            </span>
            <span className="product-card__tag">
              Capacity:{' '}
              <span className="product-card__tag-info">{product.capacity}</span>
            </span>
            <span className="product-card__tag">
              RAM <span className="product-card__tag-info">{product.ram}</span>
            </span>
          </div>

          <div className="product-card__actions">
            <button
              type="button"
              className={`product-card__button ${isInCart(id) ? ' added' : ''}`}
              onClick={handleToggleCart}
            >
              {isInCart(id) ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={`product-card__button-favorite${isFavorite(id) ? ' active' : ''}`}
              onClick={() => toggleFavorite({ ...product, id })}
            >
              <img
                src={
                  isFavorite(id)
                    ? 'img/icons/Favourites--active.svg'
                    : 'img/icons/Favourites.svg'
                }
                alt={
                  isFavorite(id) ? 'Remove from Wishlist' : 'Add to Wishlist'
                }
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductCard);
