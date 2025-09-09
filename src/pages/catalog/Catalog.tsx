import React from 'react';
import { Header } from '../../components/header/header/Header';
import { Footer } from '../../components/footer/Footer';

export const Catalog: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <section className="filter">
          <div className="container">
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__home">
                    <img
                      className="breadcrumbs__icon"
                      src="../../../public/icons/home/Home.png"
                      alt="Home"
                    />
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <img
                    src="../../../public/icons/arrow/Arrow.png"
                    alt="arrow"
                    className="breadcrumbs__arrow"
                  />
                  <a className="breadcrumbs__link text-small">Phones</a>
                </li>
              </ul>
            </nav>
            <div className="filter__head">
              <h1 className="filter__title text-h1">Mobile phones</h1>
              <p className="filter__text text-small">95 models</p>
            </div>
            <div className="filter__wrapper">
              <label className="filter__label text-small">
                Sort by
                <select name="sort" className="filter__sort">
                  <option className="filter__option">Newest</option>
                  <option className="filter__option">Newest</option>
                  <option className="filter__option">Newest</option>
                </select>
              </label>
              <label className="filter__label text-small">
                Items on page
                <select name="items" className="filter__sort filter__sort--sm">
                  <option className="filter__option">16</option>
                  <option className="filter__option">15</option>
                  <option className="filter__option">14</option>
                </select>
              </label>
            </div>
          </div>
        </section>
        <section className="products">
          <div className="container">
            <ul className="grid-list">
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
        <section className="pagination">
          <div className="container">
            <nav className="pagination__nav">
              <a href="#" className="pagination__button">
                <img
                  src="../../../public/icons/arrow/Arrow.png"
                  alt="arrow right"
                  className="pagination__icon pagination__icon--left"
                />
              </a>
              <div className="pagination__list">
                <a href="#" className="pagination__number text-body">
                  1
                </a>
                <a
                  href="#"
                  className="pagination__number
                  text-body
                  pagination__number--selected"
                >
                  2
                </a>
                <a href="#" className="pagination__number text-body">
                  3
                </a>
                <a href="#" className="pagination__number text-body">
                  4
                </a>
              </div>
              <a href="#" className="pagination__button">
                <img
                  src="../../../public/icons/arrow/Arrow.png"
                  alt="arrow left"
                  className="pagination__icon"
                />
              </a>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
