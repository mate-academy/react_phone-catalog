import './ProductCart.scss';
import React from 'react';

type Props = {
  phone: {
    name: string;
    priceRegular: number;
    priceDiscount: number;
    screen: string;
    capacity: string;
    ram: string;
    images: string[];
  };
};
export const ProductCard: React.FC<Props> = ({ phone }) => {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={phone.images[0]} alt={phone.name} />
      </div>

      <h2 className="product-card__title">{phone.name}</h2>

      <div className="product-card__prices">
        <span className="product-card__price">${phone.priceRegular}</span>
        <span className="product-card__full-price">${phone.priceDiscount}</span>
      </div>

      <div className="product-card__divider" />

      <ul className="product-card__specs">
        <li className="product-card__specs__spec">
          <span className="product-card__specs__spec__name">Screen</span>
          <span className="product-card__specs__spec__value">
            {phone.screen}
          </span>
        </li>
        <li className="product-card__specs__spec">
          <span className="product-card__specs__spec__name">Capacity</span>
          <span className="product-card__specs__spec__value">
            {phone.capacity}
          </span>
        </li>
        <li className="product-card__specs__spec">
          <span className="product-card__specs__spec__name">RAM</span>
          <span className="product-card__specs__spec__value">{phone.ram}</span>
        </li>
      </ul>

      <div className="product-card__actions">
        <button className="product-card__add">Add to cart</button>

        <button className="product-card__fav">
          <img
            className="product-card__fav__icon"
            src="/public/img/icons/Favourites%20(Heart%20Like).png"
          />
        </button>
      </div>
    </article>
  );
};
