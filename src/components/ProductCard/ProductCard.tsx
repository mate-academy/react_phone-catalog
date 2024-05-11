import React from 'react';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/products';

type Props = {
  isDiscount: boolean;
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ isDiscount, product }) => {
  const {
    itemId,
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="card">
      <Link to={`/${category}/${itemId}`} className="card__link">
        <img className="card__image" src={image} alt={itemId} />

        <div className="card__title">{name}</div>

        <div className="card__price">
          <div className="price--new">{`$${price}`}</div>
          {isDiscount && <div className="price--old">{`$${fullPrice}`}</div>}
        </div>

        <div className="card__specifications">
          <div className="specification">
            <span className="specification__title">Screen</span>
            <span className="specification__value">{screen}</span>
          </div>
          <div className="specification">
            <span className="specification__title">Capacity</span>
            <span className="specification__value">{capacity}</span>
          </div>
          <div className="specification">
            <span className="specification__title">RAM</span>
            <span className="specification__value">{ram}</span>
          </div>
        </div>
      </Link>

      <div className="card__buttons">
        <button
          className="button--add-to-card"
          // eslint-disable-next-line
          onClick={() => console.log('add to card')}
        >
          Add to card
        </button>
        <button
          className="button--add-to-favourite"
          // eslint-disable-next-line
          onClick={() => console.log('add to card')}
        />
      </div>
    </div>
  );
};
