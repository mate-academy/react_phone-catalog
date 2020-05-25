import React from 'react';
import { Button } from './../common/Button/Button'

type ProductCardProps = {
  good: Good;
}

export const ProductCard: React.FC<ProductCardProps> = ({ good }) => {
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
  } = good;

  const discountPrice = (price - price * discount / 100)
  return (
    <section className="productCard">
      <img
        className="productCard__img"
        src={imageUrl}
        alt={name} />
      <p className="productCard__title">{name}</p>

      {discount > 0
        ?
        <div className="productCard__price-container">
          <span className="productCard__price">{"$" + discountPrice}</span>
          <span className="productCard__price productCard__price--prev">{"$" + price}</span>
        </div>
        :
        <div className="productCard__price-container">
          <span className="productCard__price">{"$" + discountPrice}</span>
        </div>
      }

      <div className="productCard__description">
        <span className="productCard__feature">
          <span className="productCard__feature-title">Screen</span>
          <span className="ProductCard__feature-value">{screen}</span>
        </span>
        <span className="productCard__feature">
          <span className="productCard__feature-title">Capacity</span>
          <span className="productCard__feature-value">{capacity}</span>
        </span >
        <span className="productCard__feature">
          <span className="productCard__feature-title">RAM</span>
          <span className="productCard__feature-value">{ram}</span>
        </span>
      </div>
      <div className="productCard__btn-container btn">
        <Button classCSS={"btn__add-to-cart"} title={"Add to cart"} />
        <Button classCSS={"btn__add-to-fav"} title={''}/>
      </div>

    </section>

  )
}
