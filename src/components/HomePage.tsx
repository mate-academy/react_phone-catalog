import React from 'react';
import { Link } from 'react-router-dom';
import { Slider } from './Slider';

export const HomePage = () => (
  <section className="home" id="header">
    <Slider />
    <div className="home__category">
      <h3 className="home__title">Shop by category</h3>
      <div className="categories">
        <div className="category">
          <Link to="/phones" className="link">
            <div
              className="categories__img-container
             categories__img-container--phone "
            >
              <img src="../img/phones.png" alt="phones" />
            </div>
            <h4 className="categories__name">Tablets</h4>
            <p className="categories__number">10 models</p>
          </Link>
        </div>
        <div className="category">
          <Link to="/phones" className="link">
            <div
              className="categories__img-container
             categories__img-container--accessories"
            >
              <img src="../img/acseessoar.png" alt="phones" />
            </div>
            <h4 className="categories__name">Accessories</h4>
            <p className="categories__number">10 models</p>
          </Link>
        </div>
        <div className="category">
          <Link to="/phones" className="link">
            <div
              className="categories__img-container
              categories__img-container--tablets"
            >
              <img src="../img/tablets.png" alt="phones" />
            </div>
            <h4 className="categories__name">Mobile phones</h4>
            <p className="categories__number">10 models</p>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
