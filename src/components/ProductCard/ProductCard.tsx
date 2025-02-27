import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ToCartButton } from '../ToCartButton';
import { ToFavButton } from '../ToFavButton';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const {
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  return (
    <div className="product">
      <Link to={`/${category}/${itemId}`} className="product__link">
        <div
          className="product__picture"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <p className="product__title">{name}</p>
      </Link>
      <div className="product__prices">
        <p className="product__price">{`$${price}`}</p>
        {fullPrice > price && (
          <p className="product__full">{`$${fullPrice}`}</p>
        )}
      </div>
      <hr className="product__line" />
      <div className="product__tech">
        <p className="product__char">Screen</p>
        <p className="product__value">{screen}</p>
      </div>
      <div className="product__tech">
        <p className="product__char">Capacity</p>
        <p className="product__value">{capacity}</p>
      </div>
      <div className="product__tech">
        <p className="product__char">RAM</p>
        <p className="product__value">{ram}</p>
      </div>
      <div className="product__buttons">
        <ToCartButton product={product} />
        <ToFavButton product={product} />
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
