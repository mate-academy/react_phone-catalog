import './App.scss';
import React from 'react';

export const App: React.FC = () => (
  <div className="App">
    <h1 className="visible">Product Catalog</h1>
    <header className="header">
      <nav className="header__navigation">
        <a className="logo" href="#">
          <img className="logo__image" alt="logo" src="/icons/logo/Logo.png" />
        </a>
        <ul className="header__list">
          <li className="header__item header__item--underline">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
        </ul>
      </nav>
      <div className="header__buttons">
        <button className="header__like-button">
          <img
            className="header__icon"
            alt="like"
            src="/icons/heart/Heart.png"
          />
        </button>
        <button className="header__curt-button">
          <img className="header__icon" alt="bag" src="/icons/cart/Cart.png" />
        </button>
        <button className="header__menu-button">
          <img className="header__icon" alt="menu" src="/icons/menu/Menu.png" />
        </button>
      </div>
    </header>
    <main className="main">
      <section className="banner">
        <div className="container">
          <h2 className="banner__title title text-h1">
            Welcome to Nice Gadgets store!
          </h2>
        </div>
        <img
          className="banner__image"
          alt="Banner"
          src="/img/banner/Banner.png"
        />
        <div className="slider">
          <button className="slider__left-btn button">
            <img
              className="slider__arrow-left"
              alt="up-arrow"
              src="/icons/arrow/Arrow.png"
            />
          </button>
          <img
            src="/img/banner/Banner-tablet.png"
            alt="banner"
            className="slider__img"
          />
          <button className="slider__right-btn button">
            <img
              className="slider__arrow-right"
              alt="up-arrow"
              src="/icons/arrow/Arrow.png"
            />
          </button>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <div className="heading">
            <h2 className="heading__title title text-h2">Brand new models</h2>
            <div className="heading__buttons">
              <button className="heading__left-button button">
                <img
                  className="heading__icon-left"
                  alt="arrow-left"
                  src="/icons/arrow/Arrow.png"
                />
              </button>
              <button className="heading__right-button button">
                <img
                  className="heading__icon-right"
                  alt="arrow-right"
                  src="/icons/arrow/Arrow.png"
                />
              </button>
            </div>
          </div>
          <ul className="product">
            <li className="product__item">
              <img
                className="product__image"
                alt="Iphone"
                src="/img/phones/apple-iphone-14-pro/gold/00.webp"
              />
              <div className="product__wrapper">
                <h3 className="product__title text-body">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
                <p className="product__price text-h2">$1099</p>

                <div className="product__characteristics">
                  <div className="product__row">
                    <p className="product__key text-small">Screen</p>
                    <p className="product__value text-uppercase">6.1” OLED</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                </div>
                <div className="product__action">
                  <button className="product__add text-button">
                    Add to cart
                  </button>
                  <button className="product__like">
                    <img
                      className="product__icon"
                      src="/icons/heart/Heart.png"
                      alt="heart"
                    />
                  </button>
                </div>
              </div>
            </li>
            <li className="product__item">
              <img
                className="product__image"
                alt="Iphone"
                src="/img/phones/apple-iphone-14-pro/gold/00.webp"
              />
              <div className="product__wrapper">
                <h3 className="product__title text-body">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
                <p className="product__price text-h2">$1099</p>

                <div className="product__characteristics">
                  <div className="product__row">
                    <p className="product__key text-small">Screen</p>
                    <p className="product__value text-uppercase">6.1” OLED</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                </div>
                <div className="product__action">
                  <button className="product__add text-button">
                    Add to cart
                  </button>
                  <button className="product__like">
                    <img
                      className="product__icon"
                      src="/icons/heart/Heart.png"
                      alt="heart"
                    />
                  </button>
                </div>
              </div>
            </li>
            <li className="product__item">
              <img
                className="product__image"
                alt="Iphone"
                src="/img/phones/apple-iphone-14-pro/gold/00.webp"
              />
              <div className="product__wrapper">
                <h3 className="product__title text-body">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
                <p className="product__price text-h2">$1099</p>

                <div className="product__characteristics">
                  <div className="product__row">
                    <p className="product__key text-small">Screen</p>
                    <p className="product__value text-uppercase">6.1” OLED</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                </div>
                <div className="product__action">
                  <button className="product__add text-button">
                    Add to cart
                  </button>
                  <button className="product__like">
                    <img
                      className="product__icon"
                      src="/icons/heart/Heart.png"
                      alt="heart"
                    />
                  </button>
                </div>
              </div>
            </li>
            <li className="product__item">
              <img
                className="product__image"
                alt="Iphone"
                src="/img/phones/apple-iphone-14-pro/gold/00.webp"
              />
              <div className="product__wrapper">
                <h3 className="product__title text-body">
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </h3>
                <p className="product__price text-h2">$1099</p>

                <div className="product__characteristics">
                  <div className="product__row">
                    <p className="product__key text-small">Screen</p>
                    <p className="product__value text-uppercase">6.1” OLED</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                  <div className="product__row">
                    <p className="product__key text-small">Capacity</p>
                    <p className="product__value text-uppercase">128 GB</p>
                  </div>
                </div>
                <div className="product__action">
                  <button className="product__add text-button">
                    Add to cart
                  </button>
                  <button className="product__like">
                    <img
                      className="product__icon"
                      src="/icons/heart/Heart.png"
                      alt="heart"
                    />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="category">
        <div className="container">
          <div className="heading">
            <h2 className="heading__title title text-h2">Shop by category</h2>
          </div>
          <ul className="category__list">
            <li className="category__item">
              <a href="#" className="category__link">
                <img
                  src="/img/category/Phones.png"
                  alt="Phones"
                  className="category__image"
                />
              </a>
              <div className="category__description">
                <p className="category__name text-h4">Mobile phones</p>
                <p className="category__amount text-small">95 models</p>
              </div>
            </li>
            <li className="category__item">
              <a href="#" className="category__link">
                <img
                  src="/img/category/Tablets.png"
                  alt="Tablets"
                  className="category__image"
                />
              </a>
              <div className="category__description">
                <p className="category__name text-h4">Mobile phones</p>
                <p className="category__amount text-small">95 models</p>
              </div>
            </li>
            <li className="category__item">
              <a href="#" className="category__link">
                <img
                  src="/img/category/Accessories.png"
                  alt="Accessories"
                  className="category__image"
                />
              </a>
              <div className="category__description">
                <p className="category__name text-h4">Mobile phones</p>
                <p className="category__amount text-small">95 models</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="container">
        <a className="logo footer__logo" href="#">
          <img
            className="logo__image"
            alt="logo"
            src="/icons/logo/Logo-footer.png"
          />
        </a>
        <nav className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#" className="footer__link text-uppercase">
                Github
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link text-uppercase">
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link text-uppercase">
                rights
              </a>
            </li>
          </ul>
        </nav>
        <a className="footer__button" href="#">
          <p className="footer__text-button text-small">Back to top</p>
          <div className="footer__icon-wrapper button">
            <img
              className="footer__icon"
              alt="up-arrow"
              src="/icons/arrow/Arrow.png"
            />
          </div>
        </a>
      </div>
    </footer>
    <div className="burger-menu">
      <header className="header">
        <a className="logo" href="#">
          <img className="logo__image" alt="logo" src="/icons/logo/Logo.png" />
        </a>
        <div className="header__buttons">
          <button className="header__menu-button">
            <img
              className="header__icon"
              alt="close"
              src="/icons/close/Close.png"
            />
          </button>
        </div>
      </header>
      <div className="container">
        <div className="burger-menu__content">
          <nav className="burger-menu__navigation">
            <ul className="burger-menu__list">
              <li className="burger-menu__item burger-menu__item--underline">
                <a href="#" className="burger-menu__link text-uppercase">
                  home
                </a>
              </li>
              <li className="burger-menu__item">
                <a href="#" className="burger-menu__link text-uppercase">
                  Phones
                </a>
              </li>
              <li className="burger-menu__item">
                <a href="#" className="burger-menu__link text-uppercase">
                  tablets
                </a>
              </li>
              <li className="burger-menu__item">
                <a href="#" className="burger-menu__link text-uppercase">
                  accessories
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="burger-menu__buttons">
        <button className="burger-menu__button burger-menu__button--underline">
          <img
            className="burger-menu__icon"
            alt="like"
            src="/icons/heart/Heart.png"
          />
        </button>
        <button className="burger-menu__button">
          <img
            className="burger-menu__icon"
            alt="Cart"
            src="/icons/cart/Cart.png"
          />
        </button>
      </div>
    </div>
  </div>
);
