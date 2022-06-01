import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ControlBlock } from '../ControlBlock';
import { Description } from '../Description';
import { PriceBlock } from '../PriceBlock';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product }) => {
    return (
      <div className="product-card">
        <Link
          to={`/${product.type}s/${product.id}`}
          className="product-card__image-box"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.type}
            className="product-card__image"
          />
        </Link>
        <h3 className="product-card__title">
          {product.name}
        </h3>
        <div className="product-card__price-box">
          <PriceBlock
            price={product.price}
            discount={product.discount}
            isBig={false}
            border
          />
        </div>
        <div className="product-card__description-box">
          <Description
            screen={product.screen}
            capacity={product.capacity}
            ram={product.ram}
          />
        </div>
        <div className="product-card__control-box">
          <ControlBlock isLarge={false} />
        </div>
      </div>
    );
  },
);
