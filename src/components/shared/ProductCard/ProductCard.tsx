import React from 'react';
import './ProductCard.scss';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';
import { Specs } from '../Specs/Specs';
import { CartFavoritesToggle } from '../CartFavoritesToggle';

type Props = {
  product: Product;
  oldPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, oldPrice }) => {
  return (
    <article className="product-card">
      <Link to={`/${product.category}/${product.itemId}`}>
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            srcSet={product.image}
            src="img/phones/apple-iphone-11/black/00.webp"
            alt="Apple iPhone Xs 64GB Silver"
          />
        </div>

        <h2 className="product-card__title">{product.name}</h2>
      </Link>
      <div className="product-card__price-container">
        <span className="product-card__discount">{product.price}$</span>
        {oldPrice ? (
          <span className="product-card__full-price">{product.fullPrice}$</span>
        ) : (
          ''
        )}
      </div>

      <div className="product-card__divider" />

      <Specs
        specs={{
          Screen: product.screen,
          Capacity: product.capacity,
          RAM: product.ram,
        }}
      />
      <div className="product-card__add-favorite">
        <CartFavoritesToggle product={product} />
      </div>
    </article>
  );
};
