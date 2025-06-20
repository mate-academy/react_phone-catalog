import React from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import fakeImg from './../../images/img/phones//apple-iphone-11/black/00.webp';

import './Card.scss';

export const NewModels = () => {
  return (
    <section className="new-models slider">
      <div className="container slider__container">
        <h2 className="slider__title">Brand new models</h2>
        <div className="slider__wrapper">
          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div>
          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div>
          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div>
          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
