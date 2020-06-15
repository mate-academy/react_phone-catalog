import React from 'react';
import { Button } from './../common/Button/Button';
import { NavLink } from 'react-router-dom';


type ProductCardProps = {
  good: Good;
}

export const ProductCard: React.FC<ProductCardProps> = ({ good }) => {
  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram
  } = good;

  const discountPrice = (price - price * discount / 100)

  return (
    <section className="productcard">
      <NavLink to={`/${good.type}/${good.id}`} className="productcard__link">
      <div className="productcard__img-mask"></div>
      <div className="productcard__img-text">
        <p>Read more...</p>
      </div>
        <img
          className="productcard__img"
          src={imageUrl}
          alt={name}
        />

      </NavLink>
      <p className="productcard__title">{name}</p>

      {discount > 0
        ?
        <div className="productcard__price-container">
          <span className="productcard__price">
            {"$" + discountPrice}
          </span>
          <span className="productcard__price productcard__price--prev">
            {"$" + price}
          </span>
        </div>
        :
        <div className="productcard__price-container">
          <span className="productcard__price">
            {"$" + discountPrice}
          </span>
        </div>
      }

      <div className="productcard__description">
        <span className="productcard__feature">
          <span className="productcard__feature-title">
            Screen
          </span>
          <span className="Productcard__feature-value">
            {screen}
          </span>
        </span>
        <span className="productcard__feature">
          <span className="productcard__feature-title">
            Capacity
          </span>
          <span className="productcard__feature-value">
            {capacity}
          </span>
        </span >
        <span className="productcard__feature">
          <span className="productcard__feature-title">
            RAM
          </span>
          <span className="productcard__feature-value">
            {ram}
          </span>
        </span>
      </div>
      <div className="productcard__btn-container btn">
        <Button classCSS={"btn__add-to-cart"} title={'Add to cart'}  good={good} />
        <Button classCSS={"btn__add-to-fav"} title={''}   good={good}/>
      </div>
    </section>
  )
}
