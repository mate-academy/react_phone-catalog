import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
// import cx from 'classnames';
import './_PhoneDetails.scss';
import { Link } from 'react-router-dom';
import { setFavourites, setCart } from '../../store/actionCreators';
import { PhoneDetailsInterface } from '../../constants/types';

interface Props {
  phoneId: string;
  phoneData: PhoneDetailsInterface;
  setFavourites: (id: string) => void;
  setCart: (id: string) => void;
}

export const PhoneDetaisTemplate: FC<Props> = (props) => {
  const [activeImage, setActiveImage] = useState(0);
  const {
    phoneId,
    phoneData,
    setFavourites: setFavouritesTemplate,
    setCart: setCartTemplate,
  } = props;

  const handleFavourites = (id: string) => {
    setFavouritesTemplate(id);
  };

  const handleCart = (id: string) => {
    setCartTemplate(id);
  };

  const handleActiveImage = (ind: number) => {
    setActiveImage(ind);
  };

  return (

    <div className="phone">
      <div className="phone__breadcrumbs">
        <span className="phone__home-logo" />
        <span className="phone__location">Phones</span>
        <span className="phone__model-name">{phoneData.name}</span>
      </div>
      <Link to="/phones" className="phone__link-back">Back</Link>
      <div className="phone__main">
        <h3 className="phone__title">{phoneData.name}</h3>
        <div className="phone__top-block">
          <div className="phone__images">
            <div className="phone__sidebar-images">
              {
                phoneData.images.map((imgThumb, ind) => (
                  <button
                    type="button"
                    className="phone__btn-img"
                    onClick={() => handleActiveImage(ind)}
                  >
                    <img
                      className="phone__thumb-img"
                      src={`/img/phones/${phoneId}.${ind}.jpg`}
                      alt={`img_${ind}`}
                      key={phoneData.images[ind]}
                    />
                  </button>
                ))
              }
            </div>
            <img
              src={`/img/phones/${phoneId}.${activeImage}.jpg`}
              alt="main_img"
              className="phone__main-image"
            />
          </div>
          <div className="phone__options">
            <div className="phone__options-wrapper">
              <form action="/" className="phone__form">
                <div className="phone__colors-option">
                  <h4 className="phone__title-color">Available colors</h4>
                  <div className="phone__colors">
                    <div className="phone__color" />
                    <div className="phone__color" />
                    <div className="phone__color" />
                  </div>
                </div>
                <div className="phone__capacity">
                  <h4 className="phone__capacity-title">Select capacity</h4>
                </div>
                <div className="phone__price-option">
                  <div className="phone__price">
                    <span className="phone__price-new">$999</span>
                    <span className="phone__price-old">$1200</span>
                  </div>
                  <div className="phone__btns">
                    <button
                      type="button"
                      className="phone__cart"
                      onClick={() => handleCart(phoneData.id)}
                    >
                    Add to cart
                    </button>
                    <button
                      type="button"
                      className="phone__favourites"
                      onClick={() => handleFavourites(phoneData.id)}
                    >
                      <img
                        src="/img/header/heart.svg"
                        alt="phone_cart"
                        className="phone__heart"
                      />
                    </button>
                  </div>
                </div>
              </form>

              <div className="phone__param">
                <div className="phone__screen block">
                  <span className="left-top">Screen</span>
                  <span className="right-top">data</span>
                </div>
                <div className="phone__resolution block">
                  <span className="left-top">Resolution</span>
                  <span className="right-top">data</span>
                </div>
                <div className="phone__processor block">
                  <span className="left-top">Processor</span>
                  <span className="right-top">data</span>
                </div>
                <div className="phone__ram block">
                  <span className="left-top">RAM</span>
                  <span className="right-top">data</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="phone__bottom-block">
          <div className="phone__about">
            <h3 className="phone__subtitle">About</h3>
            <h4 className="phone__title-info">And then there was Pro</h4>
            <p className="phone__text">
              {phoneData.description}
              <br />
              <br />
                  An unprecedented leap in battery life.
                  And a mind‑blowing chip that doubles down on machine learning
                  and pushes the boundaries of what a smartphone can do.
                  Welcome to the first iPhone powerful enough to be called Pro.
            </p>
            <h4 className="phone__title-info">Camera</h4>
            <p className="phone__text">
                  Meet the first triple‑camera system to combine
                  cutting‑edge technology with the legendary simplicity
                  of iPhone. Capture up to four times more scene.
                  Get beautiful images in drastically lower light.
                  Shoot the highest‑quality video in a smartphone — then
                  edit with the same tools you love for photos.
                  You’ve never shot with anything like it.
            </p>
            <h4 className="phone__title-info">
                  Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it.
                  Tweak it. Love it.
            </h4>
            <p className="phone__text">
                  iPhone 11 Pro lets you capture videos that are beautifully
                  true to life, with greater detail and smoother motion.
                  Epic processing power means it can shoot 4K video with
                  extended dynamic range and cinematic video stabilization — all
                  at 60 fps. You get more creative control, too,
                  with four times more scene and powerful new editing tools
                  to play with.
            </p>
          </div>
          <div className="phone__specs">
            <h3 className="phone__subtitle">Tech specs</h3>
            <div className="phone__screen-specs block">
              <span className="left-bottom">Screen</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__resolution-specs block">
              <span className="left-bottom">Resolution</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__processor block">
              <span className="left-bottom">Processor</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__ram block">
              <span className="left-bottom">RAM</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__memory-specs block">
              <span className="left-bottom">Built in memory</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__camera-specs block">
              <span className="left-bottom">Camera</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__zoom block">
              <span className="left-bottom">zoom</span>
              <span className="right-bottom">data</span>
            </div>
            <div className="phone__cell block">
              <span className="left-bottom">Cell</span>
              <span className="right-bottom">data</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

const mapDispatchToProps = {
  setFavourites,
  setCart,
};

export const PhoneDetais
  = connect(null, mapDispatchToProps)(PhoneDetaisTemplate);
