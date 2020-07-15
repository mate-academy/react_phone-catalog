import React from 'react';

import './ProductCard.scss';

type Props = {
  product: ProductInfo,
  stopEvent: (e: React.TransitionEvent) => (void),
}

export const ProductCard: React.FC<Props> = ({ product, stopEvent }) => {

  return (
    <article className="product-card" onTransitionEnd={stopEvent}>
      <img
        className="product-card__img"
        src={product.imageUrl}
        alt="product_img">
      </img>
      <span className="product-card__title">{product.name}</span>
      <p className="product-card__prices">
        {product.newPrice ? (
        <>
          <span className="product-card__prices--current">${product.newPrice}</span>
          <span className="product-card__prices--previos">${product.price}</span>
        </>
        ) : (
          <span className="product-card__prices--current">${product.price}</span>
        )}
      </p>
      <ul className="product-card__info">
        <li className="product-card__info-item">
          <span className="product-card__info-title">Screen</span>
          <span className="product-card__info-value">{product.screen}</span>
        </li>
        <li className="product-card__info-item">
          <span className="product-card__info-title">Capacity</span>
          <span className="product-card__info-value">{product.capacity}</span>
        </li>
        <li className="product-card__info-item">
          <span className="product-card__info-title">RAM</span>
          <span className="product-card__info-value">{product.ram}</span>
        </li>
      </ul>
      <div className="product-card__buttons">
        <button type="button" className="product-card__buttons--add-cart">
          Add to cart
        </button>
        <button type="button" className="product-card__buttons--add-favorite">
          <svg className="product-card__buttons--icon">
            <use href="./icons/icons.svg#favorite"></use>
          </svg>
        </button>
      </div>
    </article>
  )
}
