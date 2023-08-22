/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
// import { useEffect, useState, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Aside from './components/Blocks/Aside';
import Header from './components/Blocks/Header';
import './styles/App.scss';
import Main from './components/Blocks/Main';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Aside />
      <Main />

      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <Link to="/" className="footer__home-link home-link" />
            <nav className="footer__nav nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <NavLink className="nav__link" to="/">
                    Github
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/">
                    Contacts
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/">
                    Rights
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="footer__back">
              <p className="footer__back--caption">
                Back to top
              </p>
              <button type="button" className="footer__back--button slider-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858 9.52843L7.52858 5.52843C7.78892 5.26808 8.21103 5.26808 8.47138 5.52843L12.4714 9.52843C12.7317 9.78878 12.7317 10.2109 12.4714 10.4712C12.211 10.7316 11.7889 10.7316 11.5286 10.4712L7.99998 6.94265L4.47138 10.4712C4.21103 10.7316 3.78892 10.7316 3.52858 10.4712Z"
                    fill="#313237"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

{
  /* <article className="browse-products__product">
              <div className="product__wrapper">
                <img
                  className="browse-products__product--image"
                  src="https://placehold.co/208x208/png"
                  alt=""
                />
                <div className="browse-products__product--info">
                  <p className="browse-products__product--name">
                    Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                  </p>
                  <div className="browse-products__product--price">
                    <h3 className="browse-products__product--new-price">
                      $799
                    </h3>
                    <p className="browse-products__product--old-price">$899</p>
                  </div>
                </div>
                <div className="browse-products__product--features">
                  <div className="browse-products__product--feature">
                    <h4 className="browse-products__product--feature-title">
                      Screen
                    </h4>
                    <p className="browse-products__product--feature-value">
                      5.8” OLED
                    </p>
                  </div>
                  <div className="browse-products__product--feature">
                    <p className="browse-products__product--feature-title">
                      Capacity
                    </p>
                    <p className="browse-products__product--feature-value">
                      64 GB
                    </p>
                  </div>
                  <div className="browse-products__product--feature">
                    <p className="browse-products__product--feature-title">
                      RAM
                    </p>
                    <p className="browse-products__product--feature-value">
                      4 GB
                    </p>
                  </div>
                </div>
                <div className="browse-products__product--buttons">
                  <button
                    type="button"
                    className="browse-products__product--add-to-cart"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="browse-products__product--add-to-favorites"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z"
                        fill="#333333"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article> */
}
