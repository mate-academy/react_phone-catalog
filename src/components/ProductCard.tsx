import { FC } from 'react';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    discountSum,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="product" data-cy="cardsContainer">
      <img
        src={imageUrl}
        alt="product-img"
        className="product__img"
      />
      <div className="product__header">
        <h5 className="product__title">
          {name}
        </h5>
        <div className="product__price">
          {discountSum !== undefined ? (
            <>
              <span className="product__price-current">{`$${price - discountSum}`}</span>
              <span className="product__price-full">{`$${price}`}</span>
            </>
          ) : (
            <span className="product__price-current">{`$${price}`}</span>
          )}
        </div>
      </div>
      <div className="product__details">
        <div className="product__info">
          <span className="product__info-title">Screen</span>
          <span className="product__info-description">{screen}</span>
        </div>
        <div className="product__info">
          <span className="product__info-title">Capacity</span>
          <span className="product__info-description">{capacity}</span>
        </div>
        <div className="product__info">
          <span className="product__info-title">RAM</span>
          <span className="product__info-description">{ram}</span>
        </div>
      </div>
      <div className="product__buttons">
        <button
          type="button"
          className="product__add-to-cart"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="product__add-to-favorites"
          aria-label="add-to-favorites"
        />
      </div>
    </div>
  );
};
