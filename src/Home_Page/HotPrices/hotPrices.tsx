import React, { useEffect, useState } from 'react';
import './hotPrices.scss';
import {
  ARROW_UP,
  downloadProducts,
  FAVOURITES_ICON,
} from '../../Additionals/additional_api';
import { Phones } from '../../Additionals/interfaces';

export const HotPrices = () => {
  const [phones, setPhones] = useState([]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    async function fetchData() {
      return downloadProducts();
    }

    fetchData().then(data => data
      .filter((el: { discount: number }) => el
        .discount > 0)).then(data => setPhones(data));
  }, []);

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
    <div className="HotPrices">
      <div className="HotPrices__navigation">
        <h2 className="HotPrices__navigation_header">Hot Prices</h2>
        <div className="HotPrices__navigation_buttons">
          <button
            type="button"
            onClick={pushLeftButton}
            className="HotPrices__navigation_buttons-left"
          >
            <img
              className="HotPrices__navigation_buttons-left-image"
              alt="favourites"
              src={ARROW_UP}
            />
          </button>
          <button
            type="button"
            onClick={pushRightButton}
            className="HotPrices__navigation_buttons-right"
          >
            <img
              className="HotPrices__navigation_buttons-right-image"
              alt="favourites"
              src={ARROW_UP}
            />
          </button>
        </div>
      </div>

      <div className="discount">
        <ul className="discount__list" style={{ right: position }}>
          {phones.map((el: Phones) => (
            <li key={el.id} className="discount__list_item card">
              <img className="card__image" src={el.imageUrl} alt={el.id} />
              <p className="card__title">{el.name}</p>
              <div className="card__price">
                <span className="card__price_new">
                  $
                  {el.price * (1 - (el.discount / 100))}
                </span>
                <span className="card__price_new card__price_old">
                  $
                  {el.price}
                </span>
              </div>
              <div className="card__specification_wrapper">
                <div className="card__specification">
                  <span className="card__specification_title">Screen</span>
                  <span className="card__specification_description">
                    {el.screen}
                  </span>
                </div>
                <div className="card__specification">
                  <span className="card__specification_title">Capacity</span>
                  <span className="card__specification_description">
                    {el.capacity}
                  </span>
                </div>
                <div className="card__specification">
                  <span className="card__specification_title">RAM</span>
                  <span className="card__specification_description">
                    {el.ram}
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
                  src={FAVOURITES_ICON}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
