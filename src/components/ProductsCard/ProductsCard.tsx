import React from 'react';
import classNames from 'classnames';

import { Product } from '../../helpers/types/Product';
import './ProductsCard.scss';

type Props = {
  product: Product,
};

export const ProductsCard: React.FC<Props> = ({
  product: {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  },
}) => {
  const getDiscountedPrice = () => {
    return price - price * (discount / 100);
  };

  return (
    <li className="ProductsCard" data-cy="cardsContainer">
      <img
        className="ProductsCard__image"
        src={imageUrl}
        alt={name}
      />
      <p className="ProductsCard__name">
        {name}
      </p>
      <div className="ProductsCard__prices">
        {!!discount && (
          <p className="ProductsCard__price">
            {`$${getDiscountedPrice()}`}
          </p>
        )}
        <p
          className={classNames('ProductsCard__price', {
            'ProductsCard__price--discount': !!discount,
          })}
        >
          {`$${price}`}
        </p>
      </div>
      <div className="ProductsCard__info">
        <div className="ProductsCard__field">
          <p className="ProductsCard__field-key">Screen</p>
          <p className="ProductsCard__field-value">
            {screen}
          </p>
        </div>

        <div className="ProductsCard__field">
          <p className="ProductsCard__field-key">Capacity</p>
          <p className="ProductsCard__field-value">
            {capacity || '-'}
          </p>
        </div>

        <div className="ProductsCard__field">
          <p className="ProductsCard__field-key">Ram</p>
          <p className="ProductsCard__field-value">
            {ram || '-'}
          </p>
        </div>

      </div>

      <div className="ProductsCard__add">
        <button type="button" className="ProductsCard__add-cart">
          Add to cart
        </button>
        <button type="button" className="ProductsCard__add-favorites">
          <img
            src="/img/icons/favorites_icon.svg"
            alt="Favorites Icon"
          />
        </button>
      </div>
    </li>
  );
};
