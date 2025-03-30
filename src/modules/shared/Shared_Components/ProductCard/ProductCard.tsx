import React from 'react';
import { UpdatedProduct } from '../../Types/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ActionButtons } from '../ActionButtons/ActionButtons';

interface Props {
  cardId?: string;
  item: UpdatedProduct;
  discount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ cardId, item, discount }) => {
  const imageUrl = `https://denlysiak.github.io/react_phone-catalog/${item.image}`;

  const updatedItem = {
    ...item,
    quantity: 1,
    discount: discount ? true : false,
  };

  return (
    <div
      id={`card_${!cardId ? 'list' : cardId}`}
      className="card carousel__card"
    >
      <div className="card__top">
        <div
          className="card__img"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />

        <Link to={`/${item.category}/${item.itemId}`} className="card__title">
          {item.name}
        </Link>

        <div className="card__price-container">
          {discount && <p className="card__price">{`$${item.price}`}</p>}

          <p
            className={classNames('card__price', {
              'card__price--discount': discount,
            })}
          >{`$${item.fullPrice}`}</p>
        </div>
      </div>

      <div className="card__bottom">
        <div className="card__details">
          <div className="card__detail">
            <p className="card__text">Screen</p>

            <p className="card__text card__text--property">{item.screen}</p>
          </div>

          <div className="card__detail">
            <p className="card__text">Capacity</p>

            <p className="card__text card__text--property">
              {`${parseInt(item.capacity)} GB`}
            </p>
          </div>

          <div className="card__detail">
            <p className="card__text">RAM</p>

            <p className="card__text card__text--property">{`${parseInt(item.ram)} GB`}</p>
          </div>
        </div>

        <ActionButtons item={updatedItem} />
      </div>
    </div>
  );
};
