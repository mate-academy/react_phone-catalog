import React from 'react';
import './ProductCard.scss';
import phones from '../../../../public/api/phones.json';

export const ProductCard: React.FC = () => {
  const product = { ...phones[0] };

  // console.log(product);

  return (
    <div className="productCard">
      <div className="productCard__container-photo">
        <img
          src={product.images[0]}
          alt="Product's photo"
          className="productCard__photo"
        />
      </div>

      <div className="productCard__container-title">
        <span className="productCard__title">{product.name}</span>
      </div>

      <div className="productCard__container-price">
        <span className="productCard__price-discount">
          {`$${product.priceDiscount}`}
        </span>
        <span className="productCard__price-regular">
          {`$${product.priceRegular}`}
        </span>
      </div>

      <div className="productCard__divider"></div>

      <div className="productCard__container-specifications">
        <div className="productCard__block">
          <span className="productCard__info">Screen</span>
          <span className="productCard__value">{product.screen}</span>
        </div>
        <div className="productCard__block">
          <span className="productCard__info">Capacity</span>
          <span className="productCard__value">{product.capacity}</span>
        </div>
        <div className="productCard__block">
          <span className="productCard__info">RAM</span>
          <span className="productCard__value">{product.ram}</span>
        </div>
      </div>

      <div className="productCard__container-buttons">
        <button className="productCard__button-addToCard">Add to cart</button>
        <button className="productCard__button-addToFavourite"></button>
      </div>
    </div>
  );
};
