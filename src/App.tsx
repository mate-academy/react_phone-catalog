import React from 'react';

import './App.scss';

const App = () => (
  <div className="App">
    <section className="page page--1-home">
      <header className="header" id="header">
        <label
          className="header__hamburger-toggler"
          htmlFor="hamburgerMenu"
        >
          <span className="header__hamburger-icon" />

          <input
            className="header__hamburger-input"
            id="hamburgerMenu"
            type="checkbox"
          />
        </label>

        <div className="header__logo logo">
          <a href="#home" className="logo__link">
            Logo
          </a>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link nav__link--active uppercase-text">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#phones" className="nav__link uppercase-text">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a href="#tablets" className="nav__link uppercase-text">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a href="#accessories" className="nav__link uppercase-text">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <section className="header__right-side">
          <button type="button" className="header__button button button--header">
            <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" />
            </svg>
          </button>

          <button type="button" className="header__button button button--header">
            <svg className="button__shopping-bag" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33341 6C5.7016 6 6.00008 6.29848 6.00008 6.66667C6.00008 7.1971 6.21079 7.70581 6.58587 8.08088C6.96094 8.45595 7.46965 8.66667 8.00008 8.66667C8.53051 8.66667 9.03922 8.45595 9.41429 8.08088C9.78937 7.70581 10.0001 7.1971 10.0001 6.66667C10.0001 6.29848 10.2986 6 10.6667 6C11.0349 6 11.3334 6.29848 11.3334 6.66667C11.3334 7.55072 10.9822 8.39857 10.3571 9.02369C9.73198 9.64881 8.88414 10 8.00008 10C7.11603 10 6.26818 9.64881 5.64306 9.02369C5.01794 8.39857 4.66675 7.55072 4.66675 6.66667C4.66675 6.29848 4.96522 6 5.33341 6Z" />
            </svg>
          </button>
        </section>
      </header>

      <main className="main">
        <section className="content-container content-section">
          <div className="slider">
            <div className="slider__main">
              <button type="button" className="slider__button button button--slider-btn">
                <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                </svg>
              </button>

              <div className="slider__picture">
                <img
                  className="slider__img"
                  src="img/home/slider-pic-1.png"
                  alt="iPhone 11"
                />
              </div>

              <button type="button" className="slider__button button button--slider-btn">
                <svg className="button__arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                </svg>
              </button>
            </div>

            <div className="slider__dots">
              <span className="slider__dot slider__dot--is-active" />
              <span className="slider__dot" />
              <span className="slider__dot" />
            </div>
          </div>
        </section>

        <section className="content-container content-section">
          <div className="hot-prices">
            <div className="hot-prices__heading">
              <h2 className="hot-prices__title heading-2">
                Hot prices
              </h2>

              <div className="hot-prices__buttons">
                <button type="button" className="hot-prices__button button button--promo-catalog button--disabled">
                  <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                  </svg>
                </button>

                <button type="button" className="hot-prices__button button button--promo-catalog">
                  <svg className="button__arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hot-prices__catalog promo-catalog">
              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="content-container content-section">
          <div className="categories">
            <div className="categories__heading">
              <h2 className="categories__title heading-2">
                Shop by category
              </h2>
            </div>

            <div className="categories__list">
              <div className="categories__category">
                <div className="categories__picture categories__picture--phones">
                  <img
                    className="categories__img"
                    src="img/home/categories-phones.png"
                    alt="Mobile phones category"
                  />
                </div>

                <div className="categories__description">
                  <h3 className="categories__subtitle heading-3">
                    Mobile phones
                  </h3>

                  <p className="categories__text text">
                    95 models
                  </p>
                </div>
              </div>

              <div className="categories__category">
                <div className="categories__picture categories__picture--tablets">
                  <img
                    className="categories__img"
                    src="img/home/categories-tablets.png"
                    alt="Mobile phones category"
                  />
                </div>

                <div className="categories__description">
                  <h3 className="categories__subtitle heading-3">
                    Tablets
                  </h3>

                  <p className="categories__text text">
                    24 models
                  </p>
                </div>
              </div>

              <div className="categories__category">
                <div className="categories__picture categories__picture--acces">
                  <img
                    className="categories__img"
                    src="img/home/categories-acces.png"
                    alt="Mobile phones category"
                  />
                </div>

                <div className="categories__description">
                  <h3 className="categories__subtitle heading-3">
                    Accessories
                  </h3>

                  <p className="categories__text text">
                    100 models
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-container content-section">
          <div className="new-models">
            <div className="new-models__heading">
              <h2 className="new-models__title heading-2">
                Brand new models
              </h2>

              <div className="new-models__buttons">
                <button type="button" className="new-models__button button button--promo-catalog button--disabled">
                  <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                  </svg>
                </button>

                <button type="button" className="new-models__button button button--promo-catalog">
                  <svg className="button__arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="new-models__catalog promo-catalog">
              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-512gb.png"
                    alt="iPhone 11 Pro Max 512Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1299</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      512 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 256Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 256GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$999</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-red.png"
                    alt="iPhone 11 128Gb Red"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$999</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer content-section">
        <section className="content-container">
          <div className="footer__inner">
            <div className="footer__logo logo">
              <a href="#l" className="logo__link">
                Logo
              </a>
            </div>

            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="#github" className="footer__nav-link uppercase-text">
                    Github
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#contacts" className="footer__nav-link uppercase-text">
                    Contacts
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#rights" className="footer__nav-link uppercase-text">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#header" className="footer__anchor">
              <p className="footer__anchor-text small-text">
                Back to top
              </p>

              <button type="button" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </button>
            </a>
          </div>
        </section>
      </footer>
    </section>

    <section className="page page--2-catalog">
      <header className="header header--with-search" id="header">
        <label
          className="header__hamburger-toggler"
          htmlFor="hamburgerMenu"
        >
          <span className="header__hamburger-icon" />

          <input
            className="header__hamburger-input"
            id="hamburgerMenu"
            type="checkbox"
          />
        </label>

        <div className="header__logo logo">
          <a href="#home" className="logo__link">
            Logo
          </a>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link nav__link--active uppercase-text">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#phones" className="nav__link uppercase-text">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a href="#tablets" className="nav__link uppercase-text">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a href="#accessories" className="nav__link uppercase-text">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <section className="header__right-side">
          <label className="header__search-label" htmlFor="search">
            <svg className="header__search-icon button__search" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335 2.66668C9.91083 2.66668 12.0002 4.75601 12.0002 7.33334C12.0002 8.59061 11.503 9.73176 10.6945 10.5709C10.6716 10.5884 10.6497 10.6077 10.6287 10.6286C10.6078 10.6495 10.5886 10.6715 10.571 10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617 12 2.66683 9.91067 2.66683 7.33334ZM11.0786 12.0213C10.0522 12.8424 8.75016 13.3333 7.3335 13.3333C4.01979 13.3333 1.3335 10.6471 1.3335 7.33334C1.3335 4.01963 4.01979 1.33334 7.3335 1.33334C10.6472 1.33334 13.3335 4.01963 13.3335 7.33334C13.3335 8.75003 12.8425 10.052 12.0214 11.0785L14.4715 13.5286C14.7319 13.789 14.7319 14.2111 14.4715 14.4714C14.2112 14.7318 13.7891 14.7318 13.5287 14.4714L11.0786 12.0213Z" />
            </svg>

            <input
              className="header__search-input text"
              type="search"
              id="header__search"
              placeholder="Search in phones..."
            />
          </label>

          <button type="button" className="header__button button button--header">
            <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" />
            </svg>
          </button>

          <button type="button" className="header__button button button--header">
            <svg className="button__shopping-bag" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33341 6C5.7016 6 6.00008 6.29848 6.00008 6.66667C6.00008 7.1971 6.21079 7.70581 6.58587 8.08088C6.96094 8.45595 7.46965 8.66667 8.00008 8.66667C8.53051 8.66667 9.03922 8.45595 9.41429 8.08088C9.78937 7.70581 10.0001 7.1971 10.0001 6.66667C10.0001 6.29848 10.2986 6 10.6667 6C11.0349 6 11.3334 6.29848 11.3334 6.66667C11.3334 7.55072 10.9822 8.39857 10.3571 9.02369C9.73198 9.64881 8.88414 10 8.00008 10C7.11603 10 6.26818 9.64881 5.64306 9.02369C5.01794 8.39857 4.66675 7.55072 4.66675 6.66667C4.66675 6.29848 4.96522 6 5.33341 6Z" />
            </svg>
          </button>
        </section>
      </header>

      <main className="main">
        <section className="content-container content-section">
          <section className="catalog">
            <section className="catalog__breadcrumbs breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link">
                    <span className="breadcrumbs__home-icon">
                      <svg className="button__home" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z" />
                      </svg>
                    </span>

                    <span className="breadcrumbs__icon-right">
                      <svg className="button__arrow-right breadcrumbs__arrow" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                      </svg>
                    </span>
                  </a>
                </li>

                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link breadcrumbs__link--last">
                    <span className="breadcrumbs__text small-text">
                      Phones
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section className="catalog__header page-header">
              <h1 className="page-header__title heading-1">
                Mobile phones
              </h1>
              <p className="page-header__items-quantity">
                95 models
              </p>
            </section>

            <section className="catalog__settings">
              <div className="catalog__sort">
                <p className="catalog__sort-description small-text">
                  Sort by
                </p>

                <div className="catalog__select-wrapper">
                  <select
                    className="catalog__sort-select text"
                    name="catalog__sort"
                    id="catalogSort"
                  >
                    <option value="newest">Newest</option>
                    <option value="most-popular">Most popular</option>
                    <option value="price-to-low">Price: low to high</option>
                    <option value="price-to-high">Price: high to low</option>
                  </select>

                  <div className="catalog__select-arrow">
                    <svg className="button__arrow-down" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.47149 0.528636C9.73184 0.788986 9.73184 1.2111 9.47149 1.47145L5.47149 5.47144C5.21114 5.73179 4.78903 5.73179 4.52868 5.47144L0.528677 1.47144C0.268327 1.2111 0.268327 0.788985 0.528677 0.528636C0.789026 0.268286 1.21114 0.268286 1.47149 0.528636L5.00008 4.05723L8.52868 0.528636C8.78903 0.268287 9.21114 0.268287 9.47149 0.528636Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="catalog__on-page">
                <p className="catalog__on-page-description small-text">
                  Items on page
                </p>

                <div className="catalog__select-wrapper">
                  <select
                    className="catalog__on-page-select text"
                    name="catalog__sort"
                    id="catalogSort"
                  >
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                    <option value="96">96</option>
                  </select>

                  <div className="catalog__select-arrow">
                    <svg className="button__arrow-down" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.47149 0.528636C9.73184 0.788986 9.73184 1.2111 9.47149 1.47145L5.47149 5.47144C5.21114 5.73179 4.78903 5.73179 4.52868 5.47144L0.528677 1.47144C0.268327 1.2111 0.268327 0.788985 0.528677 0.528636C0.789026 0.268286 1.21114 0.268286 1.47149 0.528636L5.00008 4.05723L8.52868 0.528636C8.78903 0.268287 9.21114 0.268287 9.47149 0.528636Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            <section className="catalog__cards">
              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

            </section>

            <section className="catalog__pagination pagination">
              <button type="button" className="pagination__button pagination__button--left button button__breadcrumbs--left">
                <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                </svg>
              </button>

              <button type="button" className="pagination__button pagination__button-number button button--pagination-number">
                1
              </button>

              <button type="button" className="pagination__button pagination__button-number button button--pagination-number button--pagination-number-is-active">
                2
              </button>

              <button type="button" className="pagination__button pagination__button-number button button--pagination-number">
                3
              </button>

              <button type="button" className="pagination__button pagination__button-number button button--pagination-number">
                4
              </button>

              <button type="button" className="pagination__button pagination__button--right button button__breadcrumbs--right">
                <svg className="button__arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                </svg>
              </button>
            </section>
          </section>
        </section>
      </main>

      <footer className="footer content-section">
        <section className="content-container">
          <div className="footer__inner">
            <div className="footer__logo logo">
              <a href="#l" className="logo__link">
                Logo
              </a>
            </div>

            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="#github" className="footer__nav-link uppercase-text">
                    Github
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#contacts" className="footer__nav-link uppercase-text">
                    Contacts
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#rights" className="footer__nav-link uppercase-text">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#header" className="footer__anchor">
              <p className="footer__anchor-text small-text">
                Back to top
              </p>

              <button type="button" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </button>
            </a>
          </div>
        </section>
      </footer>
    </section>

    <section className="page page--3-product-page">
      <header className="header" id="header">
        <label
          className="header__hamburger-toggler"
          htmlFor="hamburgerMenu"
        >
          <span className="header__hamburger-icon" />

          <input
            className="header__hamburger-input"
            id="hamburgerMenu"
            type="checkbox"
          />
        </label>

        <div className="header__logo logo">
          <a href="#home" className="logo__link">
            Logo
          </a>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link nav__link--active uppercase-text">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#phones" className="nav__link uppercase-text">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a href="#tablets" className="nav__link uppercase-text">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a href="#accessories" className="nav__link uppercase-text">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <section className="header__right-side">
          <button type="button" className="header__button button button--header">
            <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" />
            </svg>
          </button>

          <button type="button" className="header__button button button--header">
            <svg className="button__shopping-bag" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33341 6C5.7016 6 6.00008 6.29848 6.00008 6.66667C6.00008 7.1971 6.21079 7.70581 6.58587 8.08088C6.96094 8.45595 7.46965 8.66667 8.00008 8.66667C8.53051 8.66667 9.03922 8.45595 9.41429 8.08088C9.78937 7.70581 10.0001 7.1971 10.0001 6.66667C10.0001 6.29848 10.2986 6 10.6667 6C11.0349 6 11.3334 6.29848 11.3334 6.66667C11.3334 7.55072 10.9822 8.39857 10.3571 9.02369C9.73198 9.64881 8.88414 10 8.00008 10C7.11603 10 6.26818 9.64881 5.64306 9.02369C5.01794 8.39857 4.66675 7.55072 4.66675 6.66667C4.66675 6.29848 4.96522 6 5.33341 6Z" />
            </svg>
          </button>
        </section>
      </header>

      <main className="main">
        <section className="content-container content-section">
          <section className="product-page">
            <section className="product-page__breadcrumbs breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link">
                    <span className="breadcrumbs__home-icon">
                      <svg className="button__home" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z" />
                      </svg>
                    </span>

                    <span className="breadcrumbs__icon-right">
                      <svg className="button__arrow-right breadcrumbs__arrow" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                      </svg>
                    </span>
                  </a>
                </li>

                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link">
                    <span className="breadcrumbs__text small-text">
                      Phones
                    </span>

                    <span className="breadcrumbs__icon-right">
                      <svg className="button__arrow-right breadcrumbs__arrow" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                      </svg>
                    </span>
                  </a>
                </li>

                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link breadcrumbs__link--last">
                    <span className="breadcrumbs__text small-text">
                      Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section className="product-page__header page-header">
              <div className="page-header__back">
                <a href="#home" className="page-header__back-link">
                  <span className="page-header__icon-left">
                    <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                    </svg>
                  </span>

                  <span className="page-header__text-back small-text">
                    Back
                  </span>
                </a>
              </div>

              <h1 className="page-header__title heading-1">
                Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
              </h1>
            </section>

            <section className="product-page__item">
              <section className="product-page__gallery">
                <ul className="product-page__gallery-list">
                  <li className="product-page__gallery-item product-page__gallery-item--is-active">
                    <a href="#galleryPic" className="product-page__gallery-link product-page__gallery-link--is-active">
                      <img
                        className="product-page__gallery-img"
                        src="img/phones/iphone-page/iphone-2.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </a>
                  </li>

                  <li className="product-page__gallery-item">
                    <a href="#galleryPic" className="product-page__gallery-link product-page__gallery-link--is-active">
                      <img
                        className="product-page__gallery-img"
                        src="img/phones/iphone-page/iphone-3.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </a>
                  </li>

                  <li className="product-page__gallery-item">
                    <a href="#galleryPic" className="product-page__gallery-link product-page__gallery-link--is-active">
                      <img
                        className="product-page__gallery-img"
                        src="img/phones/iphone-page/iphone-4.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </a>
                  </li>

                  <li className="product-page__gallery-item">
                    <a href="#galleryPic" className="product-page__gallery-link product-page__gallery-link--is-active">
                      <img
                        className="product-page__gallery-img"
                        src="img/phones/iphone-page/iphone-5.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </a>
                  </li>

                  <li className="product-page__gallery-item">
                    <a href="#galleryPic" className="product-page__gallery-link product-page__gallery-link--is-active">
                      <img
                        className="product-page__gallery-img"
                        src="img/phones/iphone-page/iphone-1.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </a>
                  </li>
                </ul>

                <div className="product-page__gallery-active">
                  <img
                    className="product-page__gallery-active-img"
                    src="img/phones/iphone-page/iphone-1.png"
                    alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                  />
                </div>
              </section>

              <section className="product-page__choise">
                <p className="product-page__item-id uppercase-text">
                  Id: 802390
                </p>

                <article className="product-page__choise-all">
                  <div className="product-page__colors">
                    <p className="product-page__colors-title product-page__choise-title small-text">
                      Available colors
                    </p>

                    <div className="product-page__colors-available">
                      <a href="#colorLink" className="product-page__color-link product-page__color-link--is-active">
                        <span className="product-page__color product-page__color--pink" />
                      </a>

                      <a href="#colorLink" className="product-page__color-link">
                        <span className="product-page__color product-page__color--dark-green" />
                      </a>

                      <a href="#colorLink" className="product-page__color-link">
                        <span className="product-page__color product-page__color--black" />
                      </a>

                      <a href="#colorLink" className="product-page__color-link">
                        <span className="product-page__color product-page__color--white" />
                      </a>
                    </div>
                  </div>

                  <div className="product-page__capacity">
                    <p className="product-page__capacity-title product-page__choise-title small-text">
                      Select capacity
                    </p>

                    <div className="product-page__capacity-available">
                      <button type="button" className="product-page__capacity-button button button--product-page-capacity button--is-active">
                        64Gb
                      </button>

                      <button type="button" className="product-page__capacity-button button button--product-page-capacity">
                        256Gb
                      </button>

                      <button type="button" className="product-page__capacity-button button button--product-page-capacity">
                        512Gb
                      </button>
                    </div>
                  </div>

                  <div className="product-page__price">
                    <h2 className="product-page__price-value heading-2">
                      $1099

                      <span className="product-page__price-old">
                        $1199
                      </span>
                    </h2>
                  </div>

                  <div className="product-page__action card__buttons">
                    <button type="button" className="card__button button button--cart-add">
                      Add to cart
                    </button>

                    <button type="button" className="card__button button button--card-liked">
                      <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                      </svg>
                    </button>
                  </div>

                  <div className="product-page__short-characteristics">
                    <div className="product-page__short-info">
                      <p className="product-page__short-text small-text">
                        Screen
                      </p>

                      <p className="product-page__short-size small-text">
                        6.5” OLED
                      </p>
                    </div>

                    <div className="product-page__short-info">
                      <p className="product-page__short-text small-text">
                        Resolution
                      </p>

                      <p className="product-page__short-size small-text">
                        2688x1242
                      </p>
                    </div>

                    <div className="product-page__short-info">
                      <p className="product-page__short-text small-text">
                        Processor
                      </p>

                      <p className="product-page__short-size small-text">
                        Apple A12 Bionic
                      </p>
                    </div>

                    <div className="product-page__short-info">
                      <p className="product-page__short-text small-text">
                        RAM
                      </p>

                      <p className="product-page__short-size small-text">
                        3 GB
                      </p>
                    </div>
                  </div>
                </article>
              </section>
            </section>

            <section className="product-page__description">
              <section className="product-page__about">
                <p className="product-page__about-title">
                  About
                </p>

                <h3 className="product-page__about-subtitle heading-3">
                  And then there was Pro
                </h3>

                <p className="product-page__about-text text">
                  A transformative triple‑camera system that adds tons of
                  capability without complexity.
                </p>

                <p className="product-page__about-text text">
                  An unprecedented leap in battery life.
                  And a mind‑blowing chip that doubles down on machine learning and pushes
                  the boundaries of what a smartphone can do.
                  Welcome to the first iPhone powerful enough to be called Pro.
                </p>

                <h3 className="product-page__about-subtitle heading-3">
                  Camera
                </h3>

                <p className="product-page__about-text text">
                  Meet the first triple‑camera system to combine cutting‑edge technology
                  with the legendary simplicity of iPhone. Capture up to four times more scene.
                  Get beautiful images in drastically lower light. Shoot the highest‑quality video
                  in a smartphone — then edit with the same tools you love for photos.
                  You’ve never shot with anything like it.
                </p>

                <h3 className="product-page__about-subtitle heading-3">
                  Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.
                </h3>

                <p className="product-page__about-text text">
                  iPhone 11 Pro lets you capture videos that are beautifully true to life,
                  with greater detail and smoother motion. Epic processing power means
                  it can shoot 4K video with extended dynamic range and
                  cinematic video stabilization — all at 60 fps.
                  You get more creative control, too,
                  with four times more scene and powerful new editing tools to play with.
                </p>
              </section>

              <section className="product-page__specs">
                <p className="product-page__specs-title">
                  Tech specs
                </p>

                <article className="product-page__specs-item product-page__specs-screen">
                  <p className="product-page__specs-subtitle small-text">
                    Screen
                  </p>

                  <p className="product-page__specs-info small-text">
                    6.5” OLED
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-resolution">
                  <p className="product-page__specs-subtitle small-text">
                    Resolution
                  </p>

                  <p className="product-page__specs-info small-text">
                    2688x1242
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-processor">
                  <p className="product-page__specs-subtitle small-text">
                    Processor
                  </p>

                  <p className="product-page__specs-info small-text">
                    Apple A12 Bionic
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-ram">
                  <p className="product-page__specs-subtitle small-text">
                    RAM
                  </p>

                  <p className="product-page__specs-info small-text">
                    3 GB
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-memory">
                  <p className="product-page__specs-subtitle small-text">
                    Built in memory
                  </p>

                  <p className="product-page__specs-info small-text">
                    64 GB
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-camera">
                  <p className="product-page__specs-subtitle small-text">
                    Camera
                  </p>

                  <p className="product-page__specs-info small-text">
                    12 Mp + 12 Mp + 12 Mp (Triple)
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-zoom">
                  <p className="product-page__specs-subtitle small-text">
                    Zoom
                  </p>

                  <p className="product-page__specs-info small-text">
                    Optical, 2x
                  </p>
                </article>

                <article className="product-page__specs-item product-page__specs-cell">
                  <p className="product-page__specs-subtitle small-text">
                    Cell
                  </p>

                  <p className="product-page__specs-info small-text">
                    GSM, LTE, UMTS
                  </p>
                </article>
              </section>
            </section>
          </section>
        </section>

        <section className="content-container content-section">
          <div className="customer-like">
            <div className="customer-like__heading">
              <h2 className="customer-like__title heading-2">
                You may also like
              </h2>

              <div className="customer-like__buttons">
                <button type="button" className="customer-like__button button button--promo-catalog button--disabled">
                  <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                  </svg>
                </button>

                <button type="button" className="customer-like__button button button--promo-catalog">
                  <svg className="button__arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="customer-like__catalog promo-catalog">
              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="promo-catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer content-section">
        <section className="content-container">
          <div className="footer__inner">
            <div className="footer__logo logo">
              <a href="#l" className="logo__link">
                Logo
              </a>
            </div>

            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="#github" className="footer__nav-link uppercase-text">
                    Github
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#contacts" className="footer__nav-link uppercase-text">
                    Contacts
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#rights" className="footer__nav-link uppercase-text">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#header" className="footer__anchor">
              <p className="footer__anchor-text small-text">
                Back to top
              </p>

              <button type="button" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </button>
            </a>
          </div>
        </section>
      </footer>
    </section>

    <section className="page page--4-favourites">
      <header className="header header--with-search" id="header">
        <label
          className="header__hamburger-toggler"
          htmlFor="hamburgerMenu"
        >
          <span className="header__hamburger-icon" />

          <input
            className="header__hamburger-input"
            id="hamburgerMenu"
            type="checkbox"
          />
        </label>

        <div className="header__logo logo">
          <a href="#home" className="logo__link">
            Logo
          </a>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link nav__link--active uppercase-text">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#phones" className="nav__link uppercase-text">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a href="#tablets" className="nav__link uppercase-text">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a href="#accessories" className="nav__link uppercase-text">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <section className="header__right-side">
          <label className="header__search-label" htmlFor="search">
            <svg className="header__search-icon button__search" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335 2.66668C9.91083 2.66668 12.0002 4.75601 12.0002 7.33334C12.0002 8.59061 11.503 9.73176 10.6945 10.5709C10.6716 10.5884 10.6497 10.6077 10.6287 10.6286C10.6078 10.6495 10.5886 10.6715 10.571 10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617 12 2.66683 9.91067 2.66683 7.33334ZM11.0786 12.0213C10.0522 12.8424 8.75016 13.3333 7.3335 13.3333C4.01979 13.3333 1.3335 10.6471 1.3335 7.33334C1.3335 4.01963 4.01979 1.33334 7.3335 1.33334C10.6472 1.33334 13.3335 4.01963 13.3335 7.33334C13.3335 8.75003 12.8425 10.052 12.0214 11.0785L14.4715 13.5286C14.7319 13.789 14.7319 14.2111 14.4715 14.4714C14.2112 14.7318 13.7891 14.7318 13.5287 14.4714L11.0786 12.0213Z" />
            </svg>

            <input
              className="header__search-input text"
              type="search"
              id="header__search"
              placeholder="Search in favourites..."
            />
          </label>

          <button type="button" className="header__button button button--header button--active">
            <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" />
            </svg>

            <div className="header__selected-items-quantity">
              <p className="header__selected-items-number">
                5
              </p>
            </div>
          </button>

          <button type="button" className="header__button button button--header">
            <svg className="button__shopping-bag" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33341 6C5.7016 6 6.00008 6.29848 6.00008 6.66667C6.00008 7.1971 6.21079 7.70581 6.58587 8.08088C6.96094 8.45595 7.46965 8.66667 8.00008 8.66667C8.53051 8.66667 9.03922 8.45595 9.41429 8.08088C9.78937 7.70581 10.0001 7.1971 10.0001 6.66667C10.0001 6.29848 10.2986 6 10.6667 6C11.0349 6 11.3334 6.29848 11.3334 6.66667C11.3334 7.55072 10.9822 8.39857 10.3571 9.02369C9.73198 9.64881 8.88414 10 8.00008 10C7.11603 10 6.26818 9.64881 5.64306 9.02369C5.01794 8.39857 4.66675 7.55072 4.66675 6.66667C4.66675 6.29848 4.96522 6 5.33341 6Z" />
            </svg>
          </button>
        </section>
      </header>

      <main className="main">
        <section className="content-container content-section">
          <section className="catalog">
            <section className="catalog__breadcrumbs breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link">
                    <span className="breadcrumbs__home-icon">
                      <svg className="button__home" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z" />
                      </svg>
                    </span>

                    <span className="breadcrumbs__icon-right">
                      <svg className="button__arrow-right breadcrumbs__arrow" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z" />
                      </svg>
                    </span>
                  </a>
                </li>

                <li className="breadcrumbs__item">
                  <a href="#home" className="breadcrumbs__link breadcrumbs__link--last">
                    <span className="breadcrumbs__text small-text">
                      Favourites
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section className="catalog__header page-header">
              <h1 className="page-header__title heading-1">
                Favourites
              </h1>
              <p className="page-header__items-quantity">
                5 models
              </p>
            </section>

            <section className="catalog__cards">
              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart-in-color" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart-in-color" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart-in-color" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 256Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone X 256GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$859</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      256 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      3 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart-in-color" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart-in-color" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" />
                    </svg>
                  </button>
                </div>
              </article>
            </section>
          </section>
        </section>
      </main>

      <footer className="footer content-section">
        <section className="content-container">
          <div className="footer__inner">
            <div className="footer__logo logo">
              <a href="#l" className="logo__link">
                Logo
              </a>
            </div>

            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="#github" className="footer__nav-link uppercase-text">
                    Github
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#contacts" className="footer__nav-link uppercase-text">
                    Contacts
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#rights" className="footer__nav-link uppercase-text">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#header" className="footer__anchor">
              <p className="footer__anchor-text small-text">
                Back to top
              </p>

              <button type="button" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </button>
            </a>
          </div>
        </section>
      </footer>
    </section>

    <section className="page page--5-cart">
      <header className="header" id="header">
        <label
          className="header__hamburger-toggler"
          htmlFor="hamburgerMenu"
        >
          <span className="header__hamburger-icon" />

          <input
            className="header__hamburger-input"
            id="hamburgerMenu"
            type="checkbox"
          />
        </label>

        <div className="header__logo logo">
          <a href="#home" className="logo__link">
            Logo
          </a>
        </div>

        <section className="header__right-side">
          <button type="button" className="header__button button button--header button--active">
            <svg className="button__shopping-bag" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33341 6C5.7016 6 6.00008 6.29848 6.00008 6.66667C6.00008 7.1971 6.21079 7.70581 6.58587 8.08088C6.96094 8.45595 7.46965 8.66667 8.00008 8.66667C8.53051 8.66667 9.03922 8.45595 9.41429 8.08088C9.78937 7.70581 10.0001 7.1971 10.0001 6.66667C10.0001 6.29848 10.2986 6 10.6667 6C11.0349 6 11.3334 6.29848 11.3334 6.66667C11.3334 7.55072 10.9822 8.39857 10.3571 9.02369C9.73198 9.64881 8.88414 10 8.00008 10C7.11603 10 6.26818 9.64881 5.64306 9.02369C5.01794 8.39857 4.66675 7.55072 4.66675 6.66667C4.66675 6.29848 4.96522 6 5.33341 6Z" />
            </svg>

            <div className="header__selected-items-quantity">
              <p className="header__selected-items-number">
                3
              </p>
            </div>
          </button>
        </section>
      </header>

      <main className="main">
        <section className="content-container content-section">
          <section className="basket">
            <section className="basket__header page-header">
              <div className="page-header__back">
                <a href="#home" className="page-header__back-link">
                  <span className="page-header__icon-left">
                    <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                    </svg>
                  </span>

                  <span className="page-header__text-back small-text">
                    Back
                  </span>
                </a>
              </div>

              <h1 className="page-header__title heading-1">
                Cart
              </h1>
            </section>

            <section className="basket__content">
              <div className="basket__items">
                <div className="basket__item">
                  <div className="basket__product-info">
                    <div className="basket__delete-item">
                      <svg className="button__close" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" />
                      </svg>
                    </div>

                    <div className="basket__item-picture">
                      <img
                        className="basket__item-img"
                        src="img/phones/iphone-11-pro-max-64gb.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </div>

                    <p className="basket__item-name">
                      Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                    </p>
                  </div>

                  <div className="basket__product-price">
                    <div className="basket__plus-minus">
                      <button type="button" className="basket__button button button--item-basket button--disabled">
                        <svg className="button__minus" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" />
                        </svg>
                      </button>

                      <span className="basket__item-quantity">
                        1
                      </span>

                      <button type="button" className="basket__button button button--item-basket">
                        <svg className="button__plus" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="basket__item-price heading-3">
                      $1099
                    </h3>
                  </div>
                </div>

                <div className="basket__item">
                  <div className="basket__product-info">
                    <div className="basket__delete-item">
                      <svg className="button__close" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" />
                      </svg>
                    </div>

                    <div className="basket__item-picture">
                      <img
                        className="basket__item-img"
                        src="img/phones/iphone-11-pro-max-64gb.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </div>

                    <p className="basket__item-name">
                      Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                    </p>
                  </div>

                  <div className="basket__product-price">
                    <div className="basket__plus-minus">
                      <button type="button" className="basket__button button button--item-basket button--disabled">
                        <svg className="button__minus" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" />
                        </svg>
                      </button>

                      <span className="basket__item-quantity">
                        1
                      </span>

                      <button type="button" className="basket__button button button--item-basket">
                        <svg className="button__plus" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="basket__item-price heading-3">
                      $1099
                    </h3>
                  </div>
                </div>

                <div className="basket__item">
                  <div className="basket__product-info">
                    <div className="basket__delete-item">
                      <svg className="button__close" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" />
                      </svg>
                    </div>

                    <div className="basket__item-picture">
                      <img
                        className="basket__item-img"
                        src="img/phones/iphone-11-pro-max-64gb.png"
                        alt="Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)"
                      />
                    </div>

                    <p className="basket__item-name">
                      Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                    </p>
                  </div>

                  <div className="basket__product-price">
                    <div className="basket__plus-minus">
                      <button type="button" className="basket__button button button--item-basket button--disabled">
                        <svg className="button__minus" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" />
                        </svg>
                      </button>

                      <span className="basket__item-quantity">
                        1
                      </span>

                      <button type="button" className="basket__button button button--item-basket">
                        <svg className="button__plus" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="basket__item-price heading-3">
                      $1099
                    </h3>
                  </div>
                </div>
              </div>

              <div className="basket__checkout">
                <div className="basket__price">
                  <h2 className="basket__price-total heading-2">
                    $3297
                  </h2>

                  <p className="basket__price-description">
                    Total for 3 items
                  </p>
                </div>

                <button type="button" className="basket__button button button--basket">
                  Checkout
                </button>
              </div>
            </section>
          </section>
        </section>
      </main>

      <footer className="footer content-section">
        <section className="content-container">
          <div className="footer__inner">
            <div className="footer__logo logo">
              <a href="#l" className="logo__link">
                Logo
              </a>
            </div>

            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="#github" className="footer__nav-link uppercase-text">
                    Github
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#contacts" className="footer__nav-link uppercase-text">
                    Contacts
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#rights" className="footer__nav-link uppercase-text">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#header" className="footer__anchor">
              <p className="footer__anchor-text small-text">
                Back to top
              </p>

              <button type="button" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </button>
            </a>
          </div>
        </section>
      </footer>
    </section>

    <section className="page page--6-search">
      <header className="header header--with-search" id="header">
        <label
          className="header__hamburger-toggler"
          htmlFor="hamburgerMenu"
        >
          <span className="header__hamburger-icon" />

          <input
            className="header__hamburger-input"
            id="hamburgerMenu"
            type="checkbox"
          />
        </label>

        <div className="header__logo logo">
          <a href="#home" className="logo__link">
            Logo
          </a>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link nav__link--active uppercase-text">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#phones" className="nav__link uppercase-text">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a href="#tablets" className="nav__link uppercase-text">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a href="#accessories" className="nav__link uppercase-text">
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <section className="header__right-side">
          <label className="header__search-label" htmlFor="search">
            <svg className="header__search-icon button__search" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335 2.66668C9.91083 2.66668 12.0002 4.75601 12.0002 7.33334C12.0002 8.59061 11.503 9.73176 10.6945 10.5709C10.6716 10.5884 10.6497 10.6077 10.6287 10.6286C10.6078 10.6495 10.5886 10.6715 10.571 10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617 12 2.66683 9.91067 2.66683 7.33334ZM11.0786 12.0213C10.0522 12.8424 8.75016 13.3333 7.3335 13.3333C4.01979 13.3333 1.3335 10.6471 1.3335 7.33334C1.3335 4.01963 4.01979 1.33334 7.3335 1.33334C10.6472 1.33334 13.3335 4.01963 13.3335 7.33334C13.3335 8.75003 12.8425 10.052 12.0214 11.0785L14.4715 13.5286C14.7319 13.789 14.7319 14.2111 14.4715 14.4714C14.2112 14.7318 13.7891 14.7318 13.5287 14.4714L11.0786 12.0213Z" />
            </svg>

            <input
              className="header__search-input text"
              type="search"
              id="header__search"
              placeholder="Search in favourites..."
            />
          </label>

          <button type="button" className="header__button button button--header">
            <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" />
            </svg>
          </button>

          <button type="button" className="header__button button button--header">
            <svg className="button__shopping-bag" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028 3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999H4.3335Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684 4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335 4.00001Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M5.33341 6C5.7016 6 6.00008 6.29848 6.00008 6.66667C6.00008 7.1971 6.21079 7.70581 6.58587 8.08088C6.96094 8.45595 7.46965 8.66667 8.00008 8.66667C8.53051 8.66667 9.03922 8.45595 9.41429 8.08088C9.78937 7.70581 10.0001 7.1971 10.0001 6.66667C10.0001 6.29848 10.2986 6 10.6667 6C11.0349 6 11.3334 6.29848 11.3334 6.66667C11.3334 7.55072 10.9822 8.39857 10.3571 9.02369C9.73198 9.64881 8.88414 10 8.00008 10C7.11603 10 6.26818 9.64881 5.64306 9.02369C5.01794 8.39857 4.66675 7.55072 4.66675 6.66667C4.66675 6.29848 4.96522 6 5.33341 6Z" />
            </svg>
          </button>
        </section>
      </header>

      <main className="main">
        <section className="content-container content-section">
          <section className="catalog">
            <section className="catalog__header page-header">
              <p className="page-header__items-quantity">
                3 models
              </p>
            </section>

            <section className="catalog__cards">
              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-xs-64gb.png"
                    alt="iPhone Xs 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      5.8” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-pro-max-64gb.png"
                    alt="iPhone 11 Pro Max 64Gb"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$1099</span>
                  <span className="card__old-price">$1199</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.5” OLED
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      64 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>

              <article className="catalog__card card">
                <div className="card__picture">
                  <img
                    className="card__img"
                    src="img/phones/iphone-11-128gb-purple.png"
                    alt="iPhone 11 128Gb Purple"
                  />
                </div>

                <h4 className="card__title heading-4">
                  Apple iPhone 11 128GB Purple (iMT9G2FS/A)
                </h4>

                <div className="card__price">
                  <span className="card__actual-price">$799</span>
                  <span className="card__old-price">$899</span>
                </div>

                <div className="card__characteristics">
                  <div className="card__screen-info">
                    <p className="card__screen-text small-text">
                      Screen
                    </p>
                    <p className="card__screen-size small-text">
                      6.2” IPS
                    </p>
                  </div>

                  <div className="card__capacity-info">
                    <p className="card__capacity-text small-text">
                      Capacity
                    </p>
                    <p className="card__capacity-size small-text">
                      128 GB
                    </p>
                  </div>

                  <div className="card__ram-info">
                    <p className="card__ram-text small-text">
                      RAM
                    </p>
                    <p className="card__ram-size small-text">
                      4 GB
                    </p>
                  </div>
                </div>

                <div className="card__buttons">
                  <button type="button" className="card__button button button--cart-add">
                    Add to cart
                  </button>

                  <button type="button" className="card__button button button--card-liked">
                    <svg className="button__heart" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 0.631371C10.1584 0.411797 10.7264 0.298782 11.3 0.298782C11.8737 0.298782 12.4416 0.411797 12.9716 0.631371C13.5015 0.850945 13.983 1.17277 14.3885 1.57847C14.7941 1.98394 15.1158 2.46532 15.3353 2.99514C15.5549 3.52506 15.6679 4.09305 15.6679 4.66667C15.6679 5.24028 15.5549 5.80827 15.3353 6.33819C15.1158 6.86806 14.794 7.34949 14.3884 7.75497C14.3883 7.75501 14.3884 7.75493 14.3884 7.75497L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75497C0.792668 6.9359 0.33252 5.82501 0.33252 4.66667C0.33252 3.50833 0.792668 2.39743 1.61174 1.57836C2.43081 0.759288 3.54171 0.299139 4.70005 0.299139C5.85839 0.299139 6.96928 0.759288 7.78835 1.57836L8.00005 1.79005L8.21162 1.57847C8.21166 1.57844 8.21158 1.57851 8.21162 1.57847C8.61711 1.17283 9.09865 0.850924 9.62852 0.631371ZM13.3983 2.56819C13.1228 2.29256 12.7957 2.07392 12.4357 1.92474C12.0756 1.77556 11.6898 1.69878 11.3 1.69878C10.9103 1.69878 10.5245 1.77556 10.1644 1.92474C9.80441 2.07392 9.4773 2.29256 9.2018 2.56819L8.49502 3.27497C8.22165 3.54834 7.77844 3.54834 7.50507 3.27497L6.7984 2.56831C6.24189 2.01179 5.48708 1.69914 4.70005 1.69914C3.91301 1.69914 3.15821 2.01179 2.60169 2.56831C2.04517 3.12483 1.73252 3.87963 1.73252 4.66667C1.73252 5.4537 2.04517 6.20851 2.60169 6.76502L8.00005 12.1634L13.3984 6.76502C13.674 6.48953 13.8928 6.16231 14.042 5.80228C14.1911 5.44226 14.2679 5.05637 14.2679 4.66667C14.2679 4.27696 14.1911 3.89107 14.042 3.53105C13.8928 3.17103 13.6739 2.84369 13.3983 2.56819Z" fill="#333333" />
                    </svg>
                  </button>
                </div>
              </article>
            </section>
          </section>
        </section>
      </main>

      <footer className="footer content-section">
        <section className="content-container">
          <div className="footer__inner">
            <div className="footer__logo logo">
              <a href="#l" className="logo__link">
                Logo
              </a>
            </div>

            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="#github" className="footer__nav-link uppercase-text">
                    Github
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#contacts" className="footer__nav-link uppercase-text">
                    Contacts
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="#rights" className="footer__nav-link uppercase-text">
                    Rights
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#header" className="footer__anchor">
              <p className="footer__anchor-text small-text">
                Back to top
              </p>

              <button type="button" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </button>
            </a>
          </div>
        </section>
      </footer>
    </section>
  </div>
);

export default App;
