import React from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';

export const ProductDetails: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <section className="details">
          <div className="container">
            <nav className="breadcrumbs details__breadcrumbs">
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
                  <a className="breadcrumbs__link text-small">Phones</a>
                </li>
                <li className="breadcrumbs__item breadcrumbs__item--cut">
                  <img
                    src="../../../public/img/general/icons/arrow.svg"
                    alt="arrow"
                    className="breadcrumbs__arrow"
                  />
                  {/* eslint-disable-next-line max-len */}
                  <a className="breadcrumbs__link text-small">
                    Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
                  </a>
                </li>
              </ul>
            </nav>
            <a className="back-button details__back-button text-small">
              <img
                src="../../../public/img/general/icons/arrow.svg"
                alt="arrow"
                className="back-button-arrow"
              />
              Back
            </a>
            <h1 className="details__title text-h2">
              Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
            </h1>

            <div className="details__content">
              <div className="details__image-content">
                <ul className="details__preview">
                  <li className="details__item">
                    <a className="details__link">
                      <img
                        className="details__image"
                        src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
                        alt=""
                      />
                    </a>
                  </li>
                  <li className="details__item">
                    <a className="details__link">
                      <img
                        className="details__image"
                        src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
                        alt=""
                      />
                    </a>
                  </li>
                  <li className="details__item">
                    <a className="details__link">
                      <img
                        className="details__image"
                        src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
                        alt=""
                      />
                    </a>
                  </li>
                  <li className="details__item">
                    <a className="details__link">
                      <img
                        className="details__image"
                        src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
                        alt=""
                      />
                    </a>
                  </li>
                  <li className="details__item">
                    <a className="details__link">
                      <img
                        className="details__image"
                        src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
                <div className="details__image-wrapper">
                  <img
                    src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
                    alt="gadget"
                    className="details__view"
                  />
                </div>
              </div>
              <div className="details__characteristic">
                <div className="details__characteristic-top">
                  <div className="details__colors-wrapper">
                    <p className="details__text-colors text-small">
                      Available colors
                    </p>
                    <ul className="details__colors">
                      <li className="details__color">
                        <a
                          href="#"
                          className="
                        details__link-color
                        details__link-color--beige"
                        ></a>
                      </li>
                      <li className="details__color">
                        <a
                          href="#"
                          className="
                        details__link-color
                        details__link-color--gray"
                        ></a>
                      </li>
                      <li className="details__color">
                        <a
                          href="#"
                          className="
                        details__link-color
                        details__link-color--brown"
                        ></a>
                      </li>
                      <li className="details__color">
                        <a
                          href="#"
                          className="
                        details__link-color
                        details__link-color--white"
                        ></a>
                      </li>
                    </ul>
                  </div>
                  <p className="gadget-id text-small">ID: 802390</p>
                </div>
                <div className="details__gigabits">
                  <p className="details__text-memory text-small">
                    Select capacity
                  </p>
                  <ul className="details__capacity-list">
                    <li
                      className="
                     details__capacity-item
                     details__capacity-item--selected"
                    >
                      <a
                        href="#"
                        className="
                      details__capacity-link
                      details__capacity-link--selected
                      text-body"
                      >
                        64 GB
                      </a>
                    </li>
                    <li className="details__capacity-item">
                      <a href="#" className="details__capacity-link text-body">
                        512 GB
                      </a>
                    </li>
                    <li className="details__capacity-item">
                      <a href="#" className="details__capacity-link text-body">
                        512 GB
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="price details__price text-h2">$1099</p>
                <div className="action details__action">
                  <div className="action__buttons">
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

                  <div className="characteristics details__characteristics">
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">Screen</p>
                      <p className="characteristics__value text-uppercase">
                        6.5” OLED
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Resolution
                      </p>
                      <p className="characteristics__value text-uppercase">
                        2688x1242
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">
                        Processor
                      </p>
                      <p className="characteristics__value text-uppercase">
                        Apple A12 Bionic
                      </p>
                    </div>
                    <div className="characteristics__row">
                      <p className="characteristics__key text-small">RAM</p>
                      <p className="characteristics__value text-uppercase">
                        3 GB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="section-wrapper">
            <section className="about">
              <h3 className="about__title text-h3">About</h3>
              <h4 className="about__subtitle text-h4">
                And then there was Pro
              </h4>
              <p className="about__text text-small">
                A transformative triple‑camera system that adds tons of
                capability without complexity.
              </p>
              <p className="about__text text-small">
                An unprecedented leap in battery life. And a mind‑blowing chip
                that doubles down on machine learning and pushes the boundaries
                of what a smartphone can do. Welcome to the first iPhone
                powerful enough to be called Pro.
              </p>
              <h4 className="about__subtitle text-h4">Camera</h4>
              <p className="about__text text-small">
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
              <h4 className="about__subtitle text-h4">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h4>
              <p className="about__text about__text-last text-small">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </section>
            <section className="tech-specs">
              <h3 className="tech-specs__title text-h3">Tech specs</h3>
              <div className="characteristics tech-specs__characteristics">
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">Screen</p>
                  <p className="characteristics__value text-uppercase">
                    6.5” OLED
                  </p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">Resolution</p>
                  <p className="characteristics__value text-uppercase">
                    2688x1242
                  </p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">Processor</p>
                  <p className="characteristics__value text-uppercase">A12</p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">RAM</p>
                  <p className="characteristics__value text-uppercase">3 GB</p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">
                    Built in memory
                  </p>
                  <p className="characteristics__value text-uppercase">64 GB</p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">Camera</p>
                  <p className="characteristics__value text-uppercase">
                    12 Mp + 12 Mp + 12 Mp (Triple)
                  </p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">Zoom</p>
                  <p className="characteristics__value text-uppercase">
                    Optical, 2x
                  </p>
                </div>
                <div className="characteristics__row">
                  <p className="characteristics__key text-small">Cell</p>
                  <p className="characteristics__value text-uppercase">
                    GSM, LTE, UMTS
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <section className="products">
          <div className="container">
            <div className="heading">
              <h2 className="heading__title title text-h2">
                You may also like
              </h2>
              <div className="heading__buttons">
                <button className="heading__left-button disabled button">
                  <img
                    className="heading__icon-left"
                    alt="arrow-left"
                    src="../../../public/img/general/icons/arrow.svg"
                  />
                </button>
                <button className="heading__right-button button">
                  <img
                    className="heading__icon-right"
                    alt="arrow-right"
                    src="../../../public/img/general/icons/arrow-white.svg"
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
                    <button className="action__add text-button selected">
                      Added
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
      </main>
      <Footer />
    </>
  );
};
