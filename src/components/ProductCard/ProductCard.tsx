
import React from 'react';
import './ProductCard.scss';
import { Product } from '../../interfaces';



export const ProductCard = ({ product }: { product: Product }) => {
  const {
    // age,
    // id,
    // type,
    imageUrl,
    name,
    // snippet,
    price,
    discount,
    screen,
    capacity,
    ram
  } = product;
  const discountPrice = (price - price * discount / 100)
  return (
    <div className="ProductCard">
      <img
        className="ProductCard__img"
        src={imageUrl}
        alt={name} />
      <p className="ProductCard__title">{name}</p>

      {discount > 0
        ?
        <div className="ProductCard__price-wrapper">
        <span className="ProductCard__price">{"$" + discountPrice}</span>
        <span className="ProductCard__price ProductCard__price--old">{"$" + price}</span>
        </div>
        :
        <div className="ProductCard__price-wrapper">
        <span className="ProductCard__price">{"$" + discountPrice}</span>
        </div>
      }

      <div className="ProductCard__description">
        <span className="ProductCard__feature">
          <span className="ProductCard__feature--title ProductCard__feature">Screen</span>
          <span className="ProductCard__feature--value ProductCard__feature">{screen}</span>
        </span>
        <span className="ProductCard__feature">
          <span className="ProductCard__feature--title ProductCard__feature">Capacity</span>
          <span className="ProductCard__feature--value ProductCard__feature">{capacity}</span>
        </span >
        <span className="ProductCard__feature">
          <span className="ProductCard__feature--title ProductCard__feature">RAM</span>
          <span className="ProductCard__feature--value ProductCard__feature">{ram}</span>
        </span>
      </div>
      <div className="ProductCard__buttons-wrapper">
      <button className="ProductCard__add-to-cart">Add to cart</button>
      <button className="ProductCard__add-to-fav"></button>
      </div>

    </div>
  )
}

