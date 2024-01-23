import React from 'react';
import './ProductCard.scss';
import { ProductItem } from '../../types/ProductItem';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card">
      <img
        src={`_new/${product.image}`}
        alt={product.name}
        className="card__image"
      />

      <span className="card__title">
        {`${product.name} (iMT9G2FS/A)`}
      </span>

      {product.price && product.fullPrice ? (
        <div className="card__prices">
          <span className="card__prices-price card__prices-price--current">
            {`$${product.price}`}
          </span>
          <span className="card__prices-price card__prices-price--old">
            {`$${product.fullPrice}`}
          </span>
        </div>
      ) : (
        <div className="card__prices">
          <span className="card__prices-price card__prices-price--current">
            {`$${product.price}`}
          </span>
        </div>
      )}

      <div className="card__line-break" />

      <div className="card__extra">
        <span className="card__extra-title">
          Screen
        </span>
        <span className="card__extra-value">
          {product.screen.replace("'", '"')}
        </span>
      </div>

      <div className="card__extra">
        <span className="card__extra-title">
          Capacity
        </span>
        <span className="card__extra-value">
          {product.capacity}
        </span>
      </div>

      <div className="card__extra">
        <span className="card__extra-title">
          RAM
        </span>
        <span className="card__extra-value">
          {product.ram}
        </span>
      </div>

      <div className="card__actions">
        { /* eslint-disable-next-line */}
        <button className="card__actions-toCart">
          Add to cart
        </button>
        { /* eslint-disable-next-line */}
        <button className="card__actions-toFavourite" />
      </div>

    </div>
  );
};

export default ProductCard;
