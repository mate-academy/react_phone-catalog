import React from 'react';
import './ProductCard.scss';
import { Product } from '../../../types/Product';

type Props = {
  product: Product;
  oldPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, oldPrice }) => {
  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          srcSet={product.image}
          src="img/phones/apple-iphone-11/black/00.webp"
          alt="Apple iPhone Xs 64GB Silver"
        />
      </div>

      <h2 className="product-card__title">{product.name}</h2>

      <div className="product-card__price-container">
        <span className="product-card__price">{product.price}$</span>
        {oldPrice ? (
          <span className="product-card__price-old">{product.fullPrice}$</span>
        ) : (
          ''
        )}
      </div>

      <div className="product-card__divider" />

      <ul className="product-card__specs">
        <li className="product-card__specs-item">
          <span className="product-card__specs-label">Screen</span>
          <span className="product-card__specs-value">{product.screen}</span>
        </li>
        <li className="product-card__specs-item">
          <span className="product-card__specs-label">Capacity</span>
          <span className="product-card__specs-value">{product.capacity}</span>
        </li>
        <li className="product-card__specs-item">
          <span className="product-card__specs-label">RAM</span>
          <span className="product-card__specs-value">{product.ram}</span>
        </li>
      </ul>

      <div className="product-card__buttons">
        <button className="product-card__button product-card__button--add">
          Add to cart
        </button>
        <button
          className="product-card__button product-card__button--favorite"
          aria-label="Add to favorite"
        ></button>
      </div>
    </article>
  );
};
