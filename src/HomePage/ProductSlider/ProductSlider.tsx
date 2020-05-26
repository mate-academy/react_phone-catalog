import React, { useState, FC } from 'react';
import cn from 'classnames';
import { Phones } from '../../Additional/interfaces';
import './ProductSlider.scss';


type Params = {
  title: string;
  phones: Phones[];
};


export const ProductSlider: FC<Params> = ({ phones, title }) => {
  const [position, setPosition] = useState(0);

  const pushLeftButton = () => {
    setPosition(prevPosition => (position - 288 < 0
      ? (phones.length - 4) * 288
      : prevPosition - 288));
  };

  const pushRightButton = () => {
    setPosition(prevPosition => (position + 288 < (phones.length - 3) * 288
      ? prevPosition + 288
      : 0));
  };

  return (
    <div className="ProductSlider">
      <div className="ProductSlider__navigation">
        <h2 className="ProductSlider__navigation_header">{title}</h2>
        <div className="ProductSlider__navigation_buttons">
          <button
            type="button"
            onClick={pushLeftButton}
            className="ProductSlider__navigation_buttons-left"
          >
            <img
              className="ProductSlider__navigation_buttons-left-image"
              alt="favourites"
              src="img/icons/arrow.svg"
            />
          </button>
          <button
            type="button"
            onClick={pushRightButton}
            className="ProductSlider__navigation_buttons-right"
          >
            <img
              className="ProductSlider__navigation_buttons-right-image"
              alt="favourites"
              src="img/icons/arrow.svg"
            />
          </button>
        </div>
      </div>

      <div className="discount">
        <ul className="discount__list" style={{ right: position }}>
          {phones.map((phone: Phones) => (
            <li key={phone.id} className="discount__list_item card">
              <img className="card__image" src={phone.imageUrl} alt={phone.id} />
              <p className="card__title">{phone.name}</p>
              <div className="card__price">
                {phone.discount ? (
                  <span className="card__price_new">
                    $
                    {phone.price * (1 - (phone.discount / 100))}
                  </span>
                ) : ''}
                <span className={cn(phone.discount ? 'card__price_new card__price_old' : 'card__price_new')}>
                  $
                  {phone.price}
                </span>
              </div>
              <div className="card__specification_wrapper">
                <div className="card__specification">
                  <span className="card__specification_title">Screen</span>
                  <span className="card__specification_description">
                    {phone.screen}
                  </span>
                </div>
                <div className="card__specification">
                  <span className="card__specification_title">Capacity</span>
                  <span className="card__specification_description">
                    {phone.capacity}
                  </span>
                </div>
                <div className="card__specification">
                  <span className="card__specification_title">RAM</span>
                  <span className="card__specification_description">
                    {phone.ram}
                  </span>
                </div>
              </div>
              <div className="discount__list_item-action action">
                <button
                  type="button"
                  className="action__buy"
                >
                  Add to cart
                </button>
                <img
                  className="action__add-to-fav"
                  alt="favourites"
                  src="img/icons/fav.svg"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
