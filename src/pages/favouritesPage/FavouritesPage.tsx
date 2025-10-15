import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

export const FavouritesPage: React.FC = () => {
  return (
    <>
      <Header />
      <section className="favorites">
        <div className="container">
          <div className="favorites__container">
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__home">
                    <img
                      className="breadcrumbs__icon"
                      src="../../../public/img/general/icons/home.svg"
                      alt="Home"
                    />
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <img
                    src="../../../public/img/general/icons/arrow.svg"
                    alt="arrow"
                    className="breadcrumbs__arrow"
                  />
                  <a className="breadcrumbs__link text-small">Favourites</a>
                </li>
              </ul>
            </nav>
            <div className="favorites__content">
              <h2 className="favorites__title text-h1">Favorites</h2>
              <p className="favorites__subtitle text-small">items 5</p>
            </div>
          </div>
        </div>
      </section>
      <section className="products">
        <div className="container">
          <ul className="grid-list favorites-grid-list">
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
                <p className="price text-h2">$1099</p>

                <div className="characteristics">
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Screen</p>
                    <p className="characteristics__value text-uppercase">
                      6.1” OLED
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                </div>
                <div className="action">
                  <button className="action__add text-button">
                    Add to cart
                  </button>
                  <button className="action__like">
                    <img
                      className="action__icon"
                      src="../../../public/img/general/icons/heart.svg"
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
                <p className="price text-h2">$1099</p>

                <div className="characteristics">
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Screen</p>
                    <p className="characteristics__value text-uppercase">
                      6.1” OLED
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                </div>
                <div className="action">
                  <button className="action__add text-button">
                    Add to cart
                  </button>
                  <button className="action__like">
                    <img
                      className="action__icon"
                      src="../../../public/img/general/icons/heart.svg"
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
                <p className="price text-h2">$1099</p>

                <div className="characteristics">
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Screen</p>
                    <p className="characteristics__value text-uppercase">
                      6.1” OLED
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                </div>
                <div className="action">
                  <button className="action__add text-button">
                    Add to cart
                  </button>
                  <button className="action__like">
                    <img
                      className="action__icon"
                      src="../../../public/img/general/icons/heart.svg"
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
                <p className="price text-h2">$1099</p>

                <div className="characteristics">
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Screen</p>
                    <p className="characteristics__value text-uppercase">
                      6.1” OLED
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                </div>
                <div className="action">
                  <button className="action__add text-button">
                    Add to cart
                  </button>
                  <button className="action__like">
                    <img
                      className="action__icon"
                      src="../../../public/img/general/icons/heart.svg"
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
                <p className="price text-h2">$1099</p>

                <div className="characteristics">
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Screen</p>
                    <p className="characteristics__value text-uppercase">
                      6.1” OLED
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                  <div className="characteristics__row">
                    <p className="characteristics__key text-small">Capacity</p>
                    <p className="characteristics__value text-uppercase">
                      128 GB
                    </p>
                  </div>
                </div>
                <div className="action">
                  <button className="action__add text-button">
                    Add to cart
                  </button>
                  <button className="action__like">
                    <img
                      className="action__icon"
                      src="../../../public/img/general/icons/heart.svg"
                      alt="heart"
                    />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};
