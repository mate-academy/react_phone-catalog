import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../type/Product';
import BlockBuyBtn from '../BlockBuyBtn';
import './Card.scss';

type Props = {
  product:Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  return (
    <li className="card__item">
      <div className="card">
        <div className="card__container">
          <div className="card__head">
            <div className="card__img-block">
              <img
                src={product.imageUrl}
                alt=""
                className="card__img"
              />
            </div>

            <Link
              className="card__link"
              to={`/${product.type}s/${product.id}`}
            >
              {product.name}
            </Link>
            <div className="card__price">
              {product.discount === 0 ? (
                `$${product.price}`
              ) : (
                <>
                  {`$${product.price - (product.price * product.discount) / 100}`}
                  <span className="card__price--sale">{product.price}</span>
                </>
              )}
            </div>
          </div>

          <div className="card__info-block">
            <div className="card__info">
              <span className="card__info--title">Screen</span>
              <span className="card__info--charac">{product.screen}</span>
            </div>
            <div className="card__info">
              <span className="card__info--title">Capacity</span>
              <span className="card__info--charac">{product.capacity}</span>
            </div>
            <div className="card__info">
              <span className="card__info--title">RAM</span>
              <span className="card__info--charac">{product.ram}</span>
            </div>
          </div>

          <div className="card__footer">
            <BlockBuyBtn item={product} />
          </div>
        </div>
      </div>
    </li>
  );
};
