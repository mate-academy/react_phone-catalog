/* eslint-disable no-console */
import classNames from 'classnames';
import { useState } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, price, screen, capacity, ram, discount,
  } = product;
  const [isSelected, setIsSelected] = useState(false);
  const [isaddedToCard, setIsAddedToCard] = useState(false);

  const getMemoryValue = (value: string) => {
    if (!value) {
      return 'N/A';
    }

    const num = parseInt(value.replace(/[^\d]/g, ''), 10);

    if (num / 1000 >= 1) {
      return `${Math.floor(num / 1000)}GB`;
    }

    return value;
  };

  return (
    <div
      data-cy="cardsContainer"
      className="ProductCard"
    >
      <div className="ProductCard__top">
        <div className="ProductCard__imgContainer">
          <img
            src={`https://mate-academy.github.io/react_phone-catalog/${product.imageUrl}`}
            alt={product.id}
            className="ProductCard__img"
          />
        </div>
        <p className="ProductCard__title">
          {name}
        </p>
      </div>
      <div className="ProductCard__bottom">
        <p className="ProductCard__price">
          <span className="ProductCard__withDiscount">{`$${price * ((100 - discount) / 100)}`}</span>
          {!!discount && (
            <span className="ProductCard__noDiscount">{`$${price}`}</span>
          )}
        </p>
        <div className="ProductCard__line"> </div>
        <div className="ProductCard__parameters">
          <div className="ProductCard__parameter">
            <span className="ProductCard__character">Screen</span>
            <span className="ProductCard__value">
              {screen.replace(/ inches/, '"')}
            </span>
          </div>
          <div className="ProductCard__parameter">
            <span className="ProductCard__character">Capacity</span>
            <span className="ProductCard__value">
              {getMemoryValue(capacity)}
            </span>
          </div>
          <div className="ProductCard__parameter">
            <span className="ProductCard__character">RAM</span>
            <span className="ProductCard__value">
              {getMemoryValue(ram)}
            </span>
          </div>
        </div>
        <div className="ProductCard__buttons">
          <button
            type="button"
            className={classNames(
              'ProductCard__buy',
              { 'ProductCard__buy--added': isaddedToCard },
            )}
            onClick={() => setIsAddedToCard(state => !state)}
          >
            {`${!isaddedToCard ? 'Add' : 'Added'} to cart`}
          </button>
          <button
            type="button"
            className={classNames(
              'ProductCard__like',
              'button',
              { 'ProductCard__like--selected': isSelected },
            )}
            onClick={() => setIsSelected(state => !state)}
          >
            &nbsp;
          </button>
        </div>
      </div>
    </div>
  );
};
