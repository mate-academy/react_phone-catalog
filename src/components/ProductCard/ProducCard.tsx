import React from 'react';
import './ProducCard.scss';

type Props = {
  listItem: Product;
};

export const ProducCard: React.FC<Props> = ({ listItem }) => {
  const {
    // age,
    capacity,
    discount,
    // id,
    imageUrl,
    name,
    price,
    ram,
    screen,
    // snippet,
    // type,
  } = listItem;

  const currentPrice = price * ((100 - discount) / 100);
  const currentScreen = screen.replace('inches', ' "');

  const getCurrentValue = (item: string) => {
    const newValue = item.replace(/\D/g, '');

    if (+newValue > 999) {
      return `${Math.floor(+newValue / 1000)} GB`;
    }

    return `${newValue} MB`;
  };

  const getCurrentName = (str: string) => {
    if (str.length > 25) {
      return str;
    }

    return str.padEnd(60, ' ');
  };

  return (
    <li className="hot-list__item list__item">
      <article className="product-card">
        <div className="product-card__container">
          <img
            src={imageUrl}
            alt={name}
            className="product-card__image"
          />
          <h2 className="product-card__descr">
            {getCurrentName(name)}
          </h2>
          <h3 className="product-card__title">
            {
              `$${currentPrice}`
            }
            <span className="product-card__discount">
              {
                currentPrice !== price
                && `$${price}`
              }
            </span>
          </h3>
          <div className="product-card__specifications">
            <div className="product-card__stats">
              <span className="product-card__item--left">
                Screen
              </span>
              <span className="product-card__item--right">
                {currentScreen}
              </span>
            </div>
            <div className="product-card__stats">
              <span className="product-card__item--left">
                Capacity
              </span>
              <span className="product-card__item--right">
                {getCurrentValue(capacity)}
              </span>
            </div>
            <div className="product-card__stats">
              <span className="product-card__item--left">
                RAM
              </span>
              <span className="product-card__item--right">
                {getCurrentValue(ram)}
              </span>
            </div>
          </div>
          <div className="product-card__buttons">
            <button type="button" className="button-cart">
              Add to cart
            </button>
            <button type="button" className="button-favorite">
              <img src="img/favorite.svg" alt="favorite" />
            </button>
          </div>
        </div>
      </article>
    </li>
  );
};
