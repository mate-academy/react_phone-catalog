import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import { Product } from '../../types/Product';
import { AddToCart } from '../AddToCart';
import { AddToFav } from '../AddToFav';
import { FavouriteType } from '../../types/FavouriteType';
import { CartType } from '../../types/CartType';
import { ProductChar } from '../ProductChar';

type Props = {
  product: Product | FavouriteType,
  isDiscount: boolean,
};

const convertToCart = (product: Product | FavouriteType): CartType => {
  return {
    image: product.image,
    phoneId: product.phoneId,
    name: product.name,
    price: product.price,
    quantity: 1,
  };
};

export const ProductCard: React.FC<Props> = ({ product, isDiscount }) => {
  const {
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const handleClick = useCallback(() => (
    window.scrollTo({ top: 0, left: 0 })
  ), []);

  return (
    <div className="card card--height" data-cy="cardsContainer">
      <Link
        to={`/phones/${phoneId}`}
        className="card__img-link"
        onClick={handleClick}
      >
        <img
          src={`new/${image}`}
          className="card__img"
          alt="Product"
        />
      </Link>

      <Link
        to={`/phones/${phoneId}`}
        className="card__title-link"
        onClick={handleClick}
      >
        <h2 className="card__title">
          {name}
        </h2>
      </Link>

      <div className="card__price-content">
        {isDiscount ? (
          <>
            <span className="card__price">{`$${price}`}</span>
            <span className="card__fullprice">{`$${fullPrice}`}</span>
          </>
        ) : (
          <span className="card__price">{`$${fullPrice}`}</span>
        )}
      </div>

      <div className="card__info-content">
        <ProductChar name="Screen" value={screen} />
        <ProductChar name="Capacity" value={capacity} />
        <ProductChar name="RAM" value={ram} />
      </div>

      <div className="card__actions">
        <div className="card__add-cart">
          <AddToCart product={convertToCart(product)} />
        </div>

        <div className="card__add-fav">
          <AddToFav product={product} />
        </div>
      </div>

    </div>
  );
};
