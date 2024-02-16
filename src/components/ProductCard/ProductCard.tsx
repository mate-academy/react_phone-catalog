import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { ProductItem } from '../../types/ProductItem';
import { ProductActions } from '../ProductActions';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="card__wrapper"
      >
        <img
          src={`${product.image}`}
          alt={product.name}
          className="card__image"
        />
        <p className="card__product-name">
          {`${product.name} (iMT9G2FS/A)`}
        </p>

        {
          product.price && product.fullPrice ? (
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
          )
        }

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

      </Link>
      <div className="card__action-wrapper">
        <ProductActions product={product} />
      </div>
    </div>

  );
};

export default ProductCard;
