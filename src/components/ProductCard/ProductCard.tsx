import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import { Product } from '../../types/product.types';
import { IconButton } from '../IconButton';
import { AddToCartButton } from '../AddToCartButton';
import './ProductCard.scss';
import { publicPath } from '../../utils/publicPath';

interface Props {
  product: Product;
  isFavourite: boolean;
  isInCart: boolean;
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isFavourite,
  isInCart,
  onToggleFavourite,
  onAddToCart,
}) => {
  const { name, price, fullPrice, screen, capacity, ram, image, itemId } =
    product;
  const hasDiscount = fullPrice > price;

  return (
    <article className="product-card">
      <Link
        to={`/${product.category}/${itemId}`}
        className="product-card__image-wrapper"
      >
        <img
          src={publicPath(image)}
          alt={name}
          className="product-card__image"
        />
      </Link>

      <Link
        to={`/${product.category}/${itemId}`}
        className="product-card__name"
      >
        {name}
      </Link>

      <div className="product-card__price">
        <span className="product-card__price-current">
          {formatPrice(price)}
        </span>
        {hasDiscount && (
          <span className="product-card__price-old">
            {formatPrice(fullPrice)}
          </span>
        )}
      </div>

      <dl className="product-card__specs">
        <div className="product-card__spec">
          <dt className="product-card__spec-label">Screen</dt>
          <dd className="product-card__spec-value">{screen}</dd>
        </div>
        <div className="product-card__spec">
          <dt className="product-card__spec-label">Capacity</dt>
          <dd className="product-card__spec-value">{capacity}</dd>
        </div>
        <div className="product-card__spec">
          <dt className="product-card__spec-label">RAM</dt>
          <dd className="product-card__spec-value">{ram}</dd>
        </div>
      </dl>

      <div className="product-card__footer">
        <div className="product-card__cart-btn-wrapper">
          <AddToCartButton
            isInCart={isInCart}
            onClick={() => onAddToCart(product)}
          />
        </div>

        <IconButton
          icon={isFavourite ? 'heart-filled' : 'heart'}
          ariaLabel="Add to favourites"
          active={isFavourite}
          onClick={() => onToggleFavourite(product)}
        />
      </div>
    </article>
  );
};
