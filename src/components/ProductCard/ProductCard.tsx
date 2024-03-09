import React from 'react';
import { Product } from '../../type/Product';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="Card">
      <div className="Card__content">
        <div className="Card__image">
          <img src={product.image} alt="Product card" className="Card__photo" />
        </div>

        {/* <img src={product.image} alt="Product card" className="Card__photo" /> */}

        <p className="Card__product-name">{product.name}</p>
        <div className="Card__price">
          <div className="Card__price-current Card__price-item">
            {`$${product.price}`}
          </div>
          {product.fullPrice && (
            <div className="Card__price-full Card__price-item">
              {`$${product.fullPrice}`}
            </div>
          )}
        </div>
        <div className="Card__line" />
        <div className="Card__description">
          <div className="Card__description-item">
            <p className="Card__description-text">Screen</p>
            <p className="Card__description-value">{product.screen}</p>
          </div>
          <div className="Card__description-item">
            <p className="Card__description-text">Capacity</p>
            <p className="Card__description-value">{product.capacity}</p>
          </div>
          <div className="Card__description-item">
            <p className="Card__description-text">RAM</p>
            <p className="Card__description-value">{product.ram}</p>
          </div>
        </div>
        <div className="Card__buttons">
          <button type="button" className="Card__buttons-add">
            Add to cart
          </button>
          <button type="button" className="Card__buttons-favorite selected">
            <img
              src="icons/Heart_Like.svg"
              alt="favorite"
              className="Card__buttons-favorite-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
