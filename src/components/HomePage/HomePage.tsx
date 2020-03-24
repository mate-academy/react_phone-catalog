import React from 'react';
import './_HomePage.scss';
import { Link } from 'react-router-dom';

export const HomePage = () => (
  <main className="name">
    <section className="homePage">
      <div className="homePage__wrapper">
        <div className="slider">
          <button type="button" className="slider__button slider__button--left">
            <img
              src="/images/arrow.svg"
              alt="slider_arrow_left"
              className="slider__arrow slider__arrow--left"
            />
          </button>
          <div className="slider__main">
            <div className="slider__dots">
              <span className="slider__dot" />
              <span className="slider__dot" />
              <span className="slider__dot" />
            </div>
          </div>
          <button
            type="button"
            className="slider__button slider__button--right"
          >
            <img
              src="/images/arrow.svg"
              alt="slider_arrow_right"
              className="slider__arrow slider__arrow--right"
            />
          </button>
        </div>
        <div className="homePage__hotPrices">
          <div className="homePage__prices-top">
            <h3 className="homePage__title">Hot prices</h3>
            <div className="homePage__control-btns">
              <button
                type="button"
                className="homePage__price-btn homePage__price-btn--left"
              >
                <img
                  src="/images/arrow.svg"
                  alt="arrow_control_left"
                  className="homePage__price-arrow homePage__price-arrow--left"
                />
              </button>
              <button
                type="button"
                className="homePage__price-btn homePage__price-btn--right"
              >
                <img
                  src="/images/arrow.svg"
                  alt="arrow_control_left"
                  className="homePage__price-arrow homePage__price-arrow--right"
                />
              </button>
            </div>
          </div>
          <div className="homePage__prices-main">
            <div className="temp-block" />
            <div className="temp-block" />
            <div className="temp-block" />
            <div className="temp-block" />
          </div>
        </div>
        <div className="homePage__byCategory">
          <h3 className="homePage__title">Shop by category</h3>
          <div className="homePage__category-main">
            <div className="homePage__categories">

              <div className="homePage__category">
                <img
                  src="/images/phones.png"
                  alt="category_phones"
                  className="homePage__img-phones"
                />
                <Link
                  to="/phones"
                  className="homePage__category-link"
                >
                    Mobile phones
                </Link>
                <p className="homePage__category-text">number models</p>
              </div>
            </div>
            <div className="homePage__category">
              <img
                src="/images/tablets.png"
                alt="category_tablets"
                className="homePage__img-phones"
              />
              <Link
                to="/tablets"
                className="homePage__category-link"
              >
                    Tablets
              </Link>
              <p className="homePage__category-text">number models</p>
            </div>
            <div className="homePage__category">
              <img
                src="/images/accessories.png"
                alt="category_accessories"
                className="homePage__img-phones"
              />
              <Link
                to="accessories"
                className="homePage__category-link"
              >
                    Accessories
              </Link>
              <p className="homePage__category-text">number models</p>
            </div>
          </div>
        </div>
        {/* template from hotPrices */}
        <div className="homePage__hotPrices">
          <div className="homePage__prices-top">
            <h3 className="homePage__title">Brand new models</h3>
            <div className="homePage__control-btns">
              <button
                type="button"
                className="homePage__price-btn homePage__price-btn--left"
              >
                <img
                  src="/images/arrow.svg"
                  alt="arrow_control_left"
                  className="homePage__price-arrow homePage__price-arrow--left"
                />
              </button>
              <button
                type="button"
                className="homePage__price-btn homePage__price-btn--right"
              >
                <img
                  src="/images/arrow.svg"
                  alt="arrow_control_left"
                  className="homePage__price-arrow homePage__price-arrow--right"
                />
              </button>
            </div>
          </div>
          <div className="homePage__prices-main">
            <div className="temp-block" />
            <div className="temp-block" />
            <div className="temp-block" />
            <div className="temp-block" />
          </div>
        </div>
      </div>
    </section>
  </main>
);
