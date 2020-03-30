import React from 'react';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-nav">
          <a href="#id" className="main-logo">
            <img
              src="../../img/Logo.png"
              alt="logo"
              className="main-logo__image"
            />
          </a>
          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__item">
                <a href="#." className="navigation__link">
                  Home
                </a>
              </li>
              <li className="navigation__item">
                <a href="#." className="navigation__link">
                  Phones
                </a>
              </li>
              <li className="navigation__item">
                <a href="#." className="navigation__link">
                  Tables
                </a>
              </li>
              <li className="navigation__item">
                <a href="#." className="navigation__link">
                  Accessories
                </a>
              </li>
            </ul>
          </nav>
          <label className="header-nav__label">
            <input
              type="text"
              className="header-nav__search"
              placeholder="Search"
            />
          </label>
          <div className="header-nav__likes" />
          <div className="header-nav__cart" />
        </div>
        <div className="header__slider slider section-wrapper">
          <div className="slider__wrapper">
            <button
              type="button"
              className="slider__button slider__button-left"
            />
            <ul className="slider__list">
              <li className="slider__item">
                <img
                  src="../../img/slider.png"
                  alt="iphones"
                  className="slider__image"
                />
              </li>
            </ul>
            <button
              type="button"
              className="slider__button slider__button-right"
            />
          </div>
        </div>

        <div className="slider-indicators">
          <div
            className="slider-indicators__item slider-indicators__item-active"
          />
          <div className="slider-indicators__item" />
          <div className="slider-indicators__item" />
        </div>
      </div>
    </header>
  );
};
