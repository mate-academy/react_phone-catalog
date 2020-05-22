import React from 'react';
import { Link } from 'react-router-dom';
import goodsFromServer from '../../api/products.json';

import { Icon } from '../Icon';

export const GoodsList = () => (
  <div className="container">
    <section className="section GoodList">
      {goodsFromServer.map(good => (
        <article key={good.id} className="GoodList__Item GoodItem">
          <Link to={good.id} className="GoodItem__Link">
            <img
              src="./img/phones/dell-venue.0.jpg"
              alt={good.name}
              className="GoodItem__Image"
            />
            <h3 className="GoodItem__heading">
              {good.name}
            </h3>
          </Link>
          <section className="GoodItem__Price">
            <span className="GoodItem__Price--actual">
              {good.price - (good.price / good.discount)}
            </span>
            <span className="GoodItem__Price--full">
              {good.price}
            </span>
          </section>
          <section className="GoodItem__PropsList">
            <div className="GoodItem__PropsItem">
              <span className="GoodItem__PropsItem--title">Screen</span>
              <span className="GoodItem__PropsItem--value">{good.screen}</span>
            </div>
            <div className="GoodItem__PropsItem">
              <span className="GoodItem__PropsItem--title">Capacity</span>
              <span className="GoodItem__PropsItem--value">{good.capacity}</span>
            </div>
            <div className="GoodItem__PropsItem">
              <span className="GoodItem__PropsItem--title">RAM</span>
              <span className="GoodItem__PropsItem--value">{good.ram}</span>
            </div>
          </section>
          <section className="GoodItem__Buttons">
            <div className="GoodItem__Buttons--main">
              <button type="button" className="Button">Add To Cart</button>
            </div>
            <div className="GoodItem__Buttons--main">
              <button type="button" className="Button">
                <Icon
                  name="favorites"
                  border
                  inActive={false}
                />
              </button>
            </div>
          </section>
        </article>
      ))}
    </section>
  </div>
);
