import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_PATHS } from '../../common/constants';
import { FavoriteBtn } from '../Buttons/FavoriteBtn';
import { ProductPrice } from './ProductPrice';
import { AddProductBtn } from '../Buttons/AddProductBtn';

export const ProductCard = ({
  name,
  type,
  imageUrl,
  price,
  screen,
  capacity,
  ram,
  discount,
  id,
  productCardRef,
}: ProductProps) => {
  const preparedScreen = useMemo(() => (
    screen.replace(' inches', '"')
  ), [screen]);
  const preparedCapacity = useMemo(() => (
    `${parseInt((capacity || '32000'), 10)} MB`
  ), [capacity]);
  const preparedRam = useMemo(() => (
    `${parseInt((ram || '1000'), 10)} MB`
  ), [ram]);

  const backToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article
      className="product-card"
      ref={productCardRef}
    >
      <Link
        to={`/${PRODUCT_PATHS[type]}/${id}`}
        className="product-card__link"
        onClick={backToTop}
      >
        <div className="product-card__photo">
          <img className="product-card__image" src={imageUrl} alt={name} />
        </div>
        <p className="product-card__title">{name}</p>
      </Link>
      <div className="product-card__price-container">
        <ProductPrice price={price} discount={discount} />
      </div>
      <span className="product-card__split-line" />
      <div className="product-card__details">
        <div className="product-card__details-container">
          <span className="product-card__details-title">
            Screen
          </span>
          <span className="product-card__details-info">
            {preparedScreen}
          </span>
        </div>
        <div className="product-card__details-container">
          <span className="product-card__details-title">
            Capacity
          </span>
          <span className="product-card__details-info">
            {preparedCapacity}
          </span>
        </div>
        <div className="product-card__details-container">
          <span className="product-card__details-title">
            RAM
          </span>
          <span className="product-card__details-info">
            {preparedRam}
          </span>
        </div>
      </div>
      <div className="product-card__buttons-container">
        <AddProductBtn productId={id} productPrice={price} />
        <FavoriteBtn productId={id} />
      </div>
    </article>
  );
};
