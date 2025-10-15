import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

const iconsPath = {
  bannerMobile: '../../../public/img/banner_mobile.png',
  bannerTablet: '../../../public/img/banner_tablet.png',
  arrowWhite: '../../../public/img/general/icons/arrow-white.svg',
  heart: '../../../public/img/general/icons/heart.svg',
};

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
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
            src={iconsPath.bannerMobile}
          />
          <div className="slider">
            <button className="slider__left-btn button">
              <img
                className="slider__arrow-left"
                alt="up-arrow"
                src={iconsPath.arrowWhite}
              />
            </button>
            <img
              src={iconsPath.bannerTablet}
              alt="banner"
              className="slider__img"
            />
            <button className="slider__right-btn button">
              <img
                className="slider__arrow-right"
                alt="up-arrow"
                src={iconsPath.arrowWhite}
              />
            </button>
          </div>
        </section>

        <section className="products">
          <div className="container">
            <div className="heading">
              <h2 className="heading__title title text-h2">Brand new models</h2>
              <div className="heading__buttons">
                <button className="heading__left-button disabled button">
                  <img
                    className="heading__icon-left"
                    alt="arrow-left"
                    src={iconsPath.arrowWhite}
                  />
                </button>
                <button className="heading__right-button button">
                  <img
                    className="heading__icon-right"
                    alt="arrow-right"
                    src={iconsPath.arrowWhite}
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
                  <p className="price text-h2">$1099</p>

                  <div className="characteristics">
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">Screen</p>
                      <p className="characteristics__value text-uppercase">
                        6.1” OLED
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
                      <p className="characteristics__value text-uppercase">
                        128 GB
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
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
                        src={iconsPath.heart}
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
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
                      <p className="characteristics__value text-uppercase">
                        128 GB
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
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
                        src={iconsPath.heart}
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
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
                      <p className="characteristics__value text-uppercase">
                        128 GB
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
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
                        src={iconsPath.heart}
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
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
                      <p className="characteristics__value text-uppercase">
                        128 GB
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Capacity
                      </p>
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
                        src={iconsPath.heart}
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
                    src="../../../public/img/category-phones.webp"
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
                    src="../../../public/img/category-phones.webp"
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
                    src="../../../public/img/category-phones.webp"
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
      <Footer />
    </>
  );
};
