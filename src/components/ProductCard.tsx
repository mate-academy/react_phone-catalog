import React, { FC } from 'react';

type Props = {
  phone: {
    id: string;
    category: string;
    phoneId: string;
    itemId: string;
    name: string;
    priceRegular: number;
    priceDiscount: number;
    screen: string;
    capacity: string;
    color: string;
    ram: string;
    year: number;
    image: string;
  };
};

const ProductCard: FC<Props> = ({ phone }) => {
  return (
    <div>
      <div className="productCard">
        <img
          src={phone.image}
          alt={phone.name}
          className="productCard__img"
        />
        <p className="productCard__title">
          {phone.name}
        </p>
        <h2 className="productCard__discount">
          $
          {phone.priceDiscount}
          &nbsp;
          <span className="productCard__price">
            $
            {phone.priceRegular}
          </span>
        </h2>
        <div className="productCard__description">
          <p className="productCard__info">
            Screen
          </p>
          <p className="productCard__characteristics">
            {phone.screen}
          </p>
        </div>
        <div className="productCard__description">
          <p className="productCard__info">
            Capacity
          </p>
          <p className="productCard__characteristics">
            {phone.capacity}
          </p>
        </div>
        <div className="productCard__description">
          <p className="productCard__info">
            RAM
          </p>
          <p className="productCard__characteristics">
            {phone.ram}
          </p>
        </div>
        <div className="productCard__btn">
          <button
            type="button"
            className="productCard__btn--cart"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="productCard__btn--favs"
          >
            <img src="img/favourites.svg" alt="favs logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
