import './ProductCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { AddToCart } from '../AddToCart';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { image, category, id, name, price, fullPrice, screen, capacity, ram } =
    product;

  return (
    <div className="card" data-qa="card" key={id}>
      <Link to={`/${category}/${product.itemId}`}>
        <img className="card__img" alt={name} src={`../../${image}`} />
        <p className="card__name">{name}</p>
      </Link>

      <div className="card__price">
        <p className="card__price-price">${price}</p>
        <p className="card__price-full">${fullPrice}</p>
      </div>

      <div className="card__info">
        <div className="card__info__property">
          <p className="card__info-text">Screen</p>
          <p className="card__info-value">{screen}</p>
        </div>

        <div className="card__info__property">
          <p className="card__info-text">Capacity</p>
          <p className="card__info-value">{capacity}</p>
        </div>

        <div className="card__info__property">
          <p className="card__info-text">RAM</p>
          <p className="card__info-value">{ram}</p>
        </div>
      </div>

      <AddToCart productId={product.itemId} typeOfPage="productCard" />
    </div>
  );
};
