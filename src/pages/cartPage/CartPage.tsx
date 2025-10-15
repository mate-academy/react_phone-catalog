import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

const iconPath = {
  iconClose: '../../../public/img/general/icons/close.svg',
  iconMinus: '../../../public/img/general/icons/minus.svg',
  iconPlus: '../../../public/img/general/icons/plus.svg',
  decrementIcon: '../../../public/img/general/icons/minus-white.svg',
  incrementIcon: '../../../public/img/general/icons/close-white.svg',
  item: '../../public/img/phones/apple-iphone-14-pro/gold/00.webp',
};

export const CartPage: React.FC = () => {
  return (
    <>
      <Header />
      <section className="cart">
        <div className="container">
          <h1 className="cart__tittle text-h1">Cart</h1>
          <div className="cart__content">
            <ul className="cards">
              <li className="card">
                <div className="card__top">
                  <div className="card__picture-box">
                    <button className="card__closing-button button">
                      <img
                        className="card__icon-button"
                        src={iconPath.iconClose}
                        alt="closing picture"
                      />
                    </button>
                    <img
                      className="card__picture"
                      src={iconPath.item}
                      alt="card image"
                    />
                  </div>
                  <h3 className="cart__title text-body">
                    Apple iPhone 14 Pro 128GB Silver (MQ023)
                  </h3>
                </div>
                <div className="card__bottom">
                  <div className="card__buttons">
                    <button className="card__decrement-button hover button">
                      <img
                        src={iconPath.decrementIcon}
                        alt="decrement-icon"
                        className="card__decrement-icon"
                      />
                    </button>
                    <span className="card__count text-body">1</span>
                    <button className="card__increment-button hover button">
                      <img
                        src={iconPath.incrementIcon}
                        alt="increment-icon"
                        className="card__increment-icon"
                      />
                    </button>
                  </div>
                  <h3 className="card__price text-h3">$999</h3>
                </div>
              </li>
              <li className="card">
                <div className="card__top">
                  <div className="card__picture-box">
                    <button className="card__closing-button button">
                      <img
                        className="card__icon-button"
                        src={iconPath.iconClose}
                        alt="closing picture"
                      />
                    </button>
                    <img
                      className="card__picture"
                      src={iconPath.item}
                      alt="card image"
                    />
                  </div>
                  <h3 className="cart__title text-body">
                    Apple iPhone 14 Pro 128GB Silver (MQ023)
                  </h3>
                </div>
                <div className="card__bottom">
                  <div className="card__buttons">
                    <button className="card__decrement-button hover button">
                      <img
                        src={iconPath.decrementIcon}
                        alt="decrement-icon"
                        className="card__decrement-icon"
                      />
                    </button>
                    <span className="card__count text-body">1</span>
                    <button className="card__increment-button hover button">
                      <img
                        src={iconPath.incrementIcon}
                        alt="increment-icon"
                        className="card__increment-icon"
                      />
                    </button>
                  </div>
                  <h3 className="card__price text-h3">$999</h3>
                </div>
              </li>
              <li className="card">
                <div className="card__top">
                  <div className="card__picture-box">
                    <button className="card__closing-button button">
                      <img
                        className="card__icon-button"
                        src={iconPath.iconClose}
                        alt="closing picture"
                      />
                    </button>
                    <img
                      className="card__picture"
                      src={iconPath.item}
                      alt="card image"
                    />
                  </div>
                  <h3 className="cart__title text-body">
                    Apple iPhone 14 Pro 128GB Silver (MQ023)
                  </h3>
                </div>
                <div className="card__bottom">
                  <div className="card__buttons">
                    <button className="card__decrement-button hover button">
                      <img
                        src={iconPath.decrementIcon}
                        alt="decrement-icon"
                        className="card__decrement-icon"
                      />
                    </button>
                    <span className="card__count text-body">1</span>
                    <button className="card__increment-button hover button">
                      <img
                        src={iconPath.incrementIcon}
                        alt="increment-icon"
                        className="card__increment-icon"
                      />
                    </button>
                  </div>
                  <h3 className="card__price text-h3">$999</h3>
                </div>
              </li>
            </ul>
            <div className="cart__checkout">
              <h2 className="cart__price text-h2">$2657</h2>
              <p className="cart__subtext text-body">Total for 3 items</p>
              <button className="cart__button text-button action__add">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
