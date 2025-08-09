import React from 'react';
import './ProductCard.scss';
import { Product } from '../../utils/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product">
      <div className="product__characteristics">
        <img
          className="product__image"
          src={product.image}
          alt="product image"
        />
        <p className="product__description">{product.name}</p>
        <p className="product__price">${product.fullPrice}</p>
      </div>

      <div className="product__details">
        <div className="product__details-row">
          <div className="product__details-name">Screen</div>
          <div className="product__details-value">{product.screen}</div>
        </div>
        <div className="product__details-row">
          <div className="product__details-name">Capacity</div>
          <div className="product__details-value">{product.capacity}</div>
        </div>
        <div className="product__details-row">
          <div className="product__details-name">RAM</div>
          <div className="product__details-value">{product.ram}</div>
        </div>
      </div>

      <div className="product__button">
        <button className="product__button--add">Add to cart</button>
        <button className="product__button--favourite">
          <img
            src="/img/icons/icon-favourites.svg"
            alt="favourites icon"
            className="product__button-icon"
          />
        </button>
      </div>
    </div>
  );
};
