import React from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import favorite from '../../images/favorite.svg';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product__card">
      <div className="product__card--top">
        <img className="product__card--img" src={product.imageUrl} alt="card" />
        <p className="product__card--name">{product.name}</p>
        <div className="product__card--price">
          <div className="product__card--price-total">
            {`$${product.price - (product.discount / 100) * product.price}`}
          </div>
          <div className="product__card--price-full">{`$${product.price}`}</div>
        </div>
      </div>

      <div className="product__card--bottom">
        <div className="product__card--desc">
          <div className="product__card--desc-item">
            Screen
            <p className="product__card--desc-detail">{product.screen}</p>
          </div>
          <div className="product__card--desc-item">
            Capacity
            <p className="product__card--desc-detail">{product.capacity}</p>
          </div>
          <div className="product__card--desc-item">
            RAM
            <p className="product__card--desc-detail">{product.ram}</p>
          </div>
        </div>
      </div>

      <div className="product__card--button">
        <a href="/" className="product__card--button-cart">Add to cart</a>
        <img src={favorite} alt="add to favorite" />
      </div>
    </div>
  );
};
