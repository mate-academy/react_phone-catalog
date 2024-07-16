import './Categories.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const Categories: React.FC = () => {
  return (
    <div className="container">
      <div className="categories">
        <h2 className="categories__title">Shop by category</h2>
        <div className="categories__box">
          <div className="categories__box--card card">
            <Link to="/phones">
              <img className="card__img" src="img/categories/phones.webp" />
              <h3 className="card__title">Mobile phones</h3>
            </Link>
            <p className="card__descr">95 models</p>
          </div>
          <div className="categories__box--card card">
            <Link to="/tablets">
              <img className="card__img" src="img/categories/tablets.webp" />
              <h3 className="card__title">Tablets</h3>
            </Link>
            <p className="card__descr">24 models</p>
          </div>
          <div className="categories__box--card card">
            <Link to="/accessories">
              <img className="card__img" src="img/categories/accessories.jpg" />
              <h3 className="card__title">Accessories</h3>
            </Link>
            <p className="card__descr">100 models</p>
          </div>
        </div>
      </div>
    </div>
  );
};
