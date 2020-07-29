import React from 'react';

import './App.scss';

const App = () => (
  <div className="App">
    <section className="first-page">
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
                <button type="button" className="hot-prices__button button button--disabled">
                  <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                  </svg>
                </button>

                <button type="button" className="hot-prices__button button">
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
                <button type="button" className="new-models__button button button--disabled">
                  <svg className="button__arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" />
                  </svg>
                </button>

                <button type="button" className="new-models__button button">
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

            <div className="footer__anchor">
              <a href="#header" className="footer__button button button--anchor">
                <svg className="button__arrow-up" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.528758 5.47136C0.268409 5.21101 0.268409 4.7889 0.528758 4.52855L4.52876 0.528555C4.78911 0.268206 5.21122 0.268206 5.47157 0.528556L9.47157 4.52856C9.73192 4.78891 9.73192 5.21102 9.47157 5.47137C9.21122 5.73171 8.78911 5.73171 8.52876 5.47136L5.00016 1.94277L1.47157 5.47136C1.21122 5.73171 0.789108 5.73171 0.528758 5.47136Z" />
                </svg>
              </a>

              <p className="footer__anchor-text small-text">
                Back to top
              </p>
            </div>
          </div>
        </section>
      </footer>
    </section>
  </div>
);

export default App;
