/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './style/_cart.scss';

import cart1 from './image/Cart1.png';
import main from './image/main.png';
import del from './image/Union.png';

export const Cart = ({ logo }) => (
  <>
    <header className="header">
      <a className="header__item">
        <img className="header__logo" src={logo} alt="logo" />
      </a>
      <a href="#i" className="icon__link">
        <img src={cart1} alt="" />
      </a>
    </header>
    <section className="back container">
      <p className="back__dark">&#60;</p>
      <p>Back</p>
    </section>
    <div className="title container">Cart</div>
    <section className="main container">
      <div className="main__cards">
        <div className="main__card">
          <img className="main__delete" src={del} alt="" />
          <img className="main__img" src={main} alt="" />
          <p className="main__name">
            Apple iPhone 11 Pro Max 64GB Gold
            <br />
            iMT9G2FS/A)
          </p>
          <div className="main__buttons">
            <button className="main__button" type="button">-</button>
            <span>1</span>
            <button className="main__button" type="button">+</button>
          </div>
          <p className="main__price">$1099</p>
        </div>

        <div className="main__card">
          <img className="main__delete" src={del} alt="" />
          <img className="main__img" src={main} alt="" />
          <p className="main__name">
            Apple iPhone 11 Pro Max 64GB Gold
            <br />
            iMT9G2FS/A)
          </p>
          <div className="main__buttons">
            <button className="main__button" type="button">-</button>
            <span>1</span>
            <button className="main__button" type="button">+</button>
          </div>
          <p className="main__price">$1099</p>
        </div>

        <div className="main__card">
          <img className="main__delete" src={del} alt="" />
          <img className="main__img" src={main} alt="" />
          <p className="main__name">
            Apple iPhone 11 Pro Max 64GB Gold
            <br />
            iMT9G2FS/A)
          </p>
          <div className="main__buttons">
            <button className="main__button" type="button">-</button>
            <span>1</span>
            <button className="main__button" type="button">+</button>
          </div>
          <p className="main__price">$1099</p>
        </div>
      </div>
      <div className="main__total">
        <p className="total__price">$3297</p>
        <p className="total__count">Total for 3 items</p>
        <p className="total__line" />
        <button type="button" className="total__button">Checkout</button>
      </div>
    </section>
    <footer className="footer">
      <img className="footer__logo" src={logo} alt="" />
      <ul className="footer__list">
        <li className="footer__item">
          <a className="footer__link" href="#git">
            github
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#cont">
            contacts
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#rig">
            rights
          </a>
        </li>
      </ul>
      <div className="footer__top" />
    </footer>
  </>
);
