/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './App.scss';
import logo from './image/Logo.png';
import fav from './image/Favourites.png';
import cart from './image/Cart.png';
import banner from './image/Banner.png';
import like from './image/like.svg';
import hot1 from './image/hot1.png';
import hot2 from './image/hot2.png';
import hot3 from './image/hot3.png';
import hot4 from './image/hot4.png';
import brand1 from './image/brand1.png';
import brand4 from './image/brand4.png';
import phone from './image/Phones.png';
import phone1 from './image/Phones1.png';
import phone2 from './image/Phones2.png';
import { ItemCard } from './ItemCard';
import { Cart } from './Cart';

const App = () => (
  <>
    <div className="App">
      <header className="header">
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <img className="header__logo" src={logo} alt="logo" />
            </li>
            <li className="nav__item">
              <a href="#home" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#phones" className="nav__link">
                Phones
              </a>
            </li>
            <li className="nav__item">
              <a href="#tabl" className="nav__link">
                Tablets
              </a>
            </li>
            <li className="nav__item">
              <a href="#acces" className="nav__link">
                accessories
              </a>
            </li>
          </ul>
        </nav>
        <ul className="header__icon">
          <li className="icon__item">
            <a href="#i" className="icon__link">
              <img src={fav} alt="" />
            </a>
          </li>
          <li className="icon__item">
            <a href="#i" className="icon__link">
              <img src={cart} alt="" />
            </a>
          </li>
        </ul>
      </header>
      <section className="banner container">
        <button className="banner__button" type="button">
          &#60;
        </button>
        <img src={banner} alt="banner with phones" className="banner__img" />
        <button className="banner__button" type="button">
          &#62;
        </button>
      </section>
      <section className="hotprice container">
        <div className="hotprice__top">
          <p>Hot prices</p>
          <div>
            <button className="hotprice__button" type="button">&#60;</button>
            <button className="hotprice__button" type="button">&#62;</button>
          </div>
        </div>
        <div className="hotprice__block">
          <div className="hotprice__card">
            <img className="hotprice__img" src={hot1} alt="" />
            <p className="hotprice__title">Apple Iphone Xs 64GB Silver (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $799
              <span className="hotprice__price hotprice__price--off">$899</span>
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">5.8” OLED</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">64 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

          <div className="hotprice__card">
            <img className="hotprice__img" src={hot2} alt="" />
            <p className="hotprice__title">Apple Iphone 11 Pro Max 64GB Gold (iMT9G2FS/A</p>
            <div className="hotprice__price">
              $1099
              <span className="hotprice__price hotprice__price--off">$1199</span>
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">6.5” OLED</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">64 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

          <div className="hotprice__card">
            <img className="hotprice__img" src={hot3} alt="" />
            <p className="hotprice__title">Apple Iphone 11 128GB Purple (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $799
              <span className="hotprice__price hotprice__price--off">$899</span>
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">6.2” IPS</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">128GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

          <div className="hotprice__card">
            <img className="hotprice__img" src={hot4} alt="" />
            <p className="hotprice__title">Apple Iphone X 256GB Silver (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $859
              <span className="hotprice__price hotprice__price--off">$899</span>
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">5.8” OLED</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">256 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">3 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

        </div>
      </section>
      <section className="shop container">
        <p className="shop__title">Shop by category</p>
        <div className="shop__block">
          <div className="shop__card">
            <img src={phone} className="shop__img" alt="phone" />
            <p className="shop__name">Mobile phones</p>
            <p className="shop__text">95 models</p>
          </div>
          <div className="shop__card">
            <img src={phone1} className="shop__img" alt="phone" />
            <p className="shop__name">Tablets</p>
            <p className="shop__text">24 models</p>
          </div>
          <div className="shop__card">
            <img src={phone2} className="shop__img" alt="phone" />
            <p className="shop__name">Accessorises</p>
            <p className="shop__text">100 models</p>
          </div>
        </div>
      </section>
      <section className="brand container">
        <div className="hotprice__top">
          <p>Brand new models</p>
          <div>
            <button className="hotprice__button" type="button">&#60;</button>
            <button className="hotprice__button" type="button">&#62;</button>
          </div>
        </div>
        <div className="hotprice__block">
          <div className="hotprice__card">
            <img className="hotprice__img" src={brand1} alt="" />
            <p className="hotprice__title">Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $1299
              <span className="hotprice__price hotprice__price--off">$899</span>
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">6.5” OLED</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">512 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

          <div className="hotprice__card">
            <img className="hotprice__img" src={hot2} alt="" />
            <p className="hotprice__title">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $1099
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">6.5” OLED</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">64 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

          <div className="hotprice__card">
            <img className="hotprice__img" src={hot3} alt="" />
            <p className="hotprice__title">Apple iPhone 11 256GB Purple (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $999
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">6.2” IPS</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">256 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>

          <div className="hotprice__card">
            <img className="hotprice__img" src={brand4} alt="" />
            <p className="hotprice__title">Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)</p>
            <div className="hotprice__price">
              $999
            </div>
            <div className="hotprice__contant">
              <span>Screen</span>
              <span className="hotprice__value">6.2” IPS</span>
            </div>
            <div className="hotprice__contant">
              <span>Capacity</span>
              <span className="hotprice__value">128 GB</span>
            </div>
            <div className="hotprice__contant">
              <span>Ram</span>
              <span className="hotprice__value">4 GB</span>
            </div>
            <div className="hotprice__buttons">
              <button className="hotprice__add" type="button">
                Add to cart
              </button>
              <button className="hotprice__like" type="button">
                <img src={like} alt="heart" />
              </button>
            </div>
          </div>
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
        <div className="footer__top">
          <p>Back to top</p>
          <button type="button" className="footer__button">&#60;</button>
        </div>
      </footer>
    </div>
    <ItemCard
      fav={fav}
      cart={cart}
      logo={logo}
    />
    <Cart
      logo={logo}
    />
  </>
);

export default App;
