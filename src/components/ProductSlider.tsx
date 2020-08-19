import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { isLoading } from '../store';
import { Phones } from '../interfaces/interfaces';
import { isError } from 'util';

type Props = {
  phones: Phones[];
};

const ProductSlider: FC<Props> = ({ phones }) => {
  const loading = useSelector(isLoading);
  const error = useSelector(isError);

  return (
    <div className="productSlider">
      {
        loading
        && (
          <div className="productSlider__loader" />
        )
      }
      {
        error
        && (
          <div className="productSlider__error">Loading error...</div>
        )
      }
      {phones.map(phone => (
        <div className="productSlider__item" key={phone.id}>
          <img
            src={phone.image}
            alt={phone.name}
            className="productSlider__img"
          />
          <p className="productSlider__title">
            {phone.name}
          </p>
          <h2 className="productSlider__discount">
            $
            {phone.priceDiscount}
            &nbsp;
            <span className="productSlider__price">
              $
              {phone.priceRegular}
            </span>
          </h2>
          <div className="productSlider__description">
            <p className="productSlider__info">
              Screen
            </p>
            <p className="productSlider__characteristics">
              {phone.screen}
            </p>
          </div>
          <div className="productSlider__description">
            <p className="productSlider__info">
              Capacity
            </p>
            <p className="productSlider__characteristics">
              {phone.capacity}
            </p>
          </div>
          <div className="productSlider__description">
            <p className="productSlider__info">
              RAM
            </p>
            <p className="productSlider__characteristics">
              {phone.ram}
            </p>
          </div>
          <div className="productSlider__btn">
            <button
              type="button"
              className="productSlider__btn--cart"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="productSlider__btn--favs"
            >
              <img src={`${window.location.origin}/img/favourites.svg`} alt="favs logo" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSlider;
