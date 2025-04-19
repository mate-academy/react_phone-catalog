import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { ProductImages } from '../ProductImages/ProductImages';
import favoriteIcon from '../../assets/img/Icons/favorite.png';
import favoriteFilledIcon from '../../assets/img/Icons/favorite-filed.svg';
import './ProductCard.scss';

interface ProductCardProps
  extends Omit<Product, 'category' | 'phoneId' | 'color'> {
  galleryImages?: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  image,
  screen,
  capacity,
  ram,
  galleryImages,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart, removeFromCart } = useCart();
  const isProductFavorite = isFavorite(id.toString());
  const isProductInCart = isInCart(id.toString());

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProductFavorite) {
      removeFromFavorites(id.toString());
    } else {
      addToFavorites(id.toString());
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProductInCart) {
      removeFromCart(id.toString());
    } else {
      addToCart(id.toString());
    }
  };

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card__image-container">
        <ProductImages
          name={name}
          mainImage={image}
          galleryImages={galleryImages}
          isDetailsView={false}
        />
      </div>

      <h3 className="product-card__title">{name}</h3>

      <div className="product-card__price-container">
        <span className="product-card__price">${price}</span>
        {oldPrice && (
          <span className="product-card__old-price">${oldPrice}</span>
        )}
      </div>

      <div className="product-card__specs">
        <div className="product-card__spec">
          <span className="product-card__spec-name">Screen</span>
          <span className="product-card__spec-value">{screen}</span>
        </div>

        <div className="product-card__spec">
          <span className="product-card__spec-name">Capacity</span>
          <span className="product-card__spec-value">{capacity}</span>
        </div>

        <div className="product-card__spec">
          <span className="product-card__spec-name">RAM</span>
          <span className="product-card__spec-value">{ram}</span>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          className={`product-card__add-button ${isProductInCart ? 'product-card__add-button--added' : ''}`}
          onClick={handleAddToCartClick}
          style={
            isProductInCart
              ? { backgroundColor: '#323542', color: '#fff', border: 'none' }
              : {}
          }
        >
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`product-card__favorite-button ${isProductFavorite ? 'product-card__favorite-button--active' : ''}`}
          onClick={handleFavoriteClick}
        >
          <span className="product-card__favorite-icon">
            <img
              src={isProductFavorite ? favoriteFilledIcon : favoriteIcon}
              alt="Add to favorites"
              className={`product-card__favorite-img ${isProductFavorite ? 'product-card__favorite-img--active' : ''}`}
            />
          </span>
        </button>
      </div>
    </Link>
  );
};
