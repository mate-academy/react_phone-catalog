import React from 'react';
import home from './image/Home.png';
import './style/_itemcard.scss';

import slide1 from './image/Slide1.png';
import slide2 from './image/Slide2.png';
import slide3 from './image/Slide3.png';
import slide4 from './image/Slide4.png';
import slide5 from './image/Slide5.png';
import phone from './image/Photo.png';
import color1 from './image/Color1.png';
import color2 from './image/Color2.png';
import color3 from './image/Color3.png';
import color4 from './image/Color4.png';
import like from './image/like.svg';
import hot1 from './image/hot1.png';
import hot2 from './image/hot2.png';
import hot3 from './image/hot3.png';
import hot4 from './image/hot4.png';

export const ItemCard = ({ logo, fav, cart }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <>
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
    <section className="home container">
      <img className="home__item" src={home} alt="" />
      <p className="home__item">&#62;</p>
      <p className="home__item home__item--dark">Phones</p>
      <p className="home__item">&#62;</p>
      <p className="home__item">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
    </section>
    <section className="back container">
      <p className="back__dark">&#60;</p>
      <p>Back</p>
    </section>
    <div className="title container">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</div>
    <section className="phone container">
      <div className="phone__images">
        <img src={slide1} className="phone_img" alt="" />
        <img src={slide2} className="phone_img" alt="" />
        <img src={slide3} className="phone_img" alt="" />
        <img src={slide4} className="phone_img" alt="" />
        <img src={slide5} className="phone_img" alt="" />
      </div>
      <img className="phone__pict" src={phone} alt="" />
      <div className="phone__card">
        <p className="card__contant">Available colors</p>
        <div className="card__colors">
          <img src={color1} className="card__img" alt="" />
          <img src={color2} className="card__img" alt="" />
          <img src={color3} className="card__img" alt="" />
          <img src={color4} className="card__img" alt="" />
        </div>
        <p className="card__line" />
        <p className="card__contant">Select capacity</p>
        <div>
          <button type="button" className="card__button card__button--dark">64 GB</button>
          <button type="button" className="card__button">256 GB</button>
          <button type="button" className="card__button">512 GB</button>
        </div>
        <p className="card__line" />
        <div className="card__price">
          $1099
          <span className="card__price card__price--off">$1199</span>
        </div>
        <div className="card__buttons">
          <button className="card__add" type="button">
            Add to cart
          </button>
          <button className="card__like" type="button">
            <img src={like} alt="heart" />
          </button>
        </div>
        <div className="card__contant">
          <span>Screen</span>
          <span className="card__value">6.5” OLED</span>
        </div>
        <div className="card__contant">
          <span>Resolution</span>
          <span className="card__value">2688x1242</span>
        </div>
        <div className="card__contant">
          <span>Processor</span>
          <span className="card__value">Apple A12 Bionic</span>
        </div>
        <div className="card__contant">
          <span>Ram</span>
          <span className="card__value">3 GB</span>
        </div>
      </div>
      <p className="phone__id">ID: 802390</p>
    </section>
    <section className="info container">
      <div className="info__about">
        <p className="about__name">About</p>
        <p className="about__line" />
        <p className="about__title">And then there was Pro</p>
        <p className="about__text">
          A transformative triple‑camera system that adds tons of capability
          without complexity. An unprecedented leap in battery life.
          a mind‑blowing chip that doubles down on machine learning and pushes
          e boundaries of what a smartphone can do. Welcome to the first iPhone
          powerful enough to be called Pro.
        </p>
        <p className="about__title">Camera</p>
        <p className="about__text">
          Meet the first triple‑camera system to combine cutting‑edge technology with
          the legendary simplicity of iPhone. Capture up to four times more scene.
          Get beautiful images in drastically lower light. Shoot the highest‑quality
          video in a smartphone — then edit with the same tools you love for photos.
          You’ve never shot with anything like it.
        </p>
        <p className="about__title">
          Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.
        </p>
        <p className="about__text">
          iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater
          detail and smoother motion. Epic processing power means it can shoot 4K
          video with extended dynamic range and cinematic video stabilization — all at 60 fps.
          You get more creative control, too, with four times more scene and powerful new editing
          tools to play with.
        </p>
      </div>
      <div className="info__tech">
        <p className="tech__name">Tech specs</p>
        <p className="tech__line" />
        <div className="tech__contant">
          <span>Screen</span>
          <span className="tech__value">6.5” OLED</span>
        </div>
        <div className="tech__contant">
          <span>Resolution</span>
          <span className="tech__value">2688x1242</span>
        </div>
        <div className="tech__contant">
          <span>Processor</span>
          <span className="tech__value">Apple A12 Bionic</span>
        </div>
        <div className="tech__contant">
          <span>Ram</span>
          <span className="tech__value">3 GB</span>
        </div>
        <div className="tech__contant">
          <span>Built in memory</span>
          <span className="tech__value">3 GB</span>
        </div>
        <div className="tech__contant">
          <span>Camera</span>
          <span className="tech__value">12 Mp + 12 Mp + 12 Mp (Triple)</span>
        </div>
        <div className="tech__contant">
          <span>Zoom</span>
          <span className="tech__value">Optical, 2x</span>
        </div>
        <div className="tech__contant">
          <span>Cell</span>
          <span className="tech__value">GSM, LTE, UMTS</span>
        </div>
      </div>
    </section>
    <section className="like container">
      <div className="like__top">
        <p>You may also like</p>
        <div>
          <button className="like__button" type="button">&#60;</button>
          <button className="like__button" type="button">&#62;</button>
        </div>
      </div>

      <div className="like__block">
        <div className="like__card">
          <img className="like__img" src={hot1} alt="" />
          <p className="like__title">Apple Iphone Xs 64GB Silver (iMT9G2FS/A)</p>
          <div className="like__price">
            $799
            <span className="like__price like__price--off">$899</span>
          </div>
          <div className="like__contant">
            <span>Screen</span>
            <span className="like__value">5.8” OLED</span>
          </div>
          <div className="like__contant">
            <span>Capacity</span>
            <span className="like__value">64 GB</span>
          </div>
          <div className="like__contant">
            <span>Ram</span>
            <span className="like__value">4 GB</span>
          </div>
          <div className="like__buttons">
            <button className="like__add" type="button">
              Add to cart
            </button>
            <button className="like__like" type="button">
              <img src={like} alt="heart" />
            </button>
          </div>
        </div>

        <div className="like__card">
          <img className="like__img" src={hot2} alt="" />
          <p className="like__title">Apple Iphone 11 Pro Max 64GB Gold (iMT9G2FS/A</p>
          <div className="like__price">
            $1099
            <span className="like__price like__price--off">$1199</span>
          </div>
          <div className="like__contant">
            <span>Screen</span>
            <span className="like__value">6.5” OLED</span>
          </div>
          <div className="like__contant">
            <span>Capacity</span>
            <span className="like__value">64 GB</span>
          </div>
          <div className="like__contant">
            <span>Ram</span>
            <span className="like__value">4 GB</span>
          </div>
          <div className="like__buttons">
            <button className="like__add" type="button">
              Add to cart
            </button>
            <button className="like__like" type="button">
              <img src={like} alt="heart" />
            </button>
          </div>
        </div>

        <div className="like__card">
          <img className="like__img" src={hot3} alt="" />
          <p className="like__title">Apple Iphone 11 128GB Purple (iMT9G2FS/A)</p>
          <div className="like__price">
            $799
            <span className="like__price like__price--off">$899</span>
          </div>
          <div className="like__contant">
            <span>Screen</span>
            <span className="like__value">6.2” IPS</span>
          </div>
          <div className="like__contant">
            <span>Capacity</span>
            <span className="like__value">128GB</span>
          </div>
          <div className="like__contant">
            <span>Ram</span>
            <span className="like__value">4GB</span>
          </div>
          <div className="like__buttons">
            <button className="like__add" type="button">
              Add to cart
            </button>
            <button className="like__like" type="button">
              <img src={like} alt="heart" />
            </button>
          </div>
        </div>

        <div className="like__card">
          <img className="like__img" src={hot4} alt="" />
          <p className="like__title">Apple Iphone X 256GB Silver (iMT9G2FS/A)</p>
          <div className="like__price">
            $859
            <span className="like__price like__price--off">$899</span>
          </div>
          <div className="like__contant">
            <span>Screen</span>
            <span className="like__value">5.8” OLED</span>
          </div>
          <div className="like__contant">
            <span>Capacity</span>
            <span className="like__value">256 GB</span>
          </div>
          <div className="like__contant">
            <span>Ram</span>
            <span className="like__value">3 GB</span>
          </div>
          <div className="like__buttons">
            <button className="like__add" type="button">
              Add to cart
            </button>
            <button className="like__like" type="button">
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
  </>
);
