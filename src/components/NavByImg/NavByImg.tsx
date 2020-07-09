import React from 'react';
import './styleNavByImg.scss';
import { NavLink } from 'react-router-dom';

const countModelsMobile = 43;
const countModelsTablets = 43;
const countModelsAccessories = 43;

export const NavByImg = () => (
  <>
    <section className="imgNav">
      <div className="container">
        <h2 className="title">Shop by category</h2>
        <ul className="imgNav__list">
          <li className="imgNav__item">
            <NavLink className="imgNav__link" to="/phones">
              <div className="imgNav__container">
                <img className="imgNav__img" src="./img/category/phones.png" alt="phones" />
              </div>
              <p className="imgNav__title">Mobile phones</p>
              <p className="imgNav__count">
                {countModelsMobile}
                {' '}
                models
              </p>
            </NavLink>
          </li>
          <li className="imgNav__item">
            <NavLink className="imgNav__link" to="/tablets">
              <div className="imgNav__container">
                <img className="imgNav__img" src="./img/category/tablets.png" alt="Tablets" />
              </div>
              <p className="imgNav__title">Tablets</p>
              <p className="imgNav__count">
                {countModelsTablets}
                {' '}
                models
              </p>
            </NavLink>
          </li>
          <li className="imgNav__item">
            <NavLink className="imgNav__link" to="/accessories">
              <div className="imgNav__container">
                <img className="imgNav__img" src="./img/category/accessories.png" alt="Accessories" />
              </div>
              <p className="imgNav__title">
                Accessories
              </p>
              <p className="imgNav__count">
                {countModelsAccessories}
                {' '}
                models
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  </>
);
