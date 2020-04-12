import React, { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import './_PhoneDetails.scss';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { setFavourites, setCart } from '../../store/actionCreators';
import {
  PhoneDetailsInterface,
  CartInterface,
  FavouritesState,
  CartState,
} from '../../constants/types';
import { colours } from '../../constants/api';
import { inFavouritesChecker, inCartChecker } from '../../utils/api';
import { getFavourites } from '../../store/reducers/favouritesReducer';
import { getCart } from '../../store/reducers/cartReducer';

interface Props {
  cart: CartInterface[];
  favourites: string[];
  phoneId: string;
  phoneData: PhoneDetailsInterface;
  setFavourites: (uniqueKey: string) => void;
  setCart: (uniqueKey: CartInterface) => void;
}

export const PhoneDetaisTemplate: FC<Props> = (props) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(props.phoneData.color);
  const [
    activeCapacity,
    setActiveCapacity,
  ] = useState(props.phoneData.capacity);

  const {
    setFavourites: setFavouritesTemplate,
    setCart: setCartTemplate,
    favourites,
    cart,
  } = props;

  const {
    name,
    images,
    namespaceId,
    priceDiscount,
    priceRegular,
    id,
    screen,
    ram,
    resolution,
    processor,
    capacity,
    camera,
    zoom,
    cell,
    color: colorId,
    colorsAvailable,
    capacityAvailable,
  } = props.phoneData;

  const handleFavourites = useCallback((uniqueKey: string) => {
    setFavouritesTemplate(uniqueKey);
  }, [id]);

  const handleCart = useCallback((uniqueKey: string) => {
    const phoneCart = {
      id: uniqueKey,
      amount: 1,
      imgLink: images[0],
      price: priceDiscount,
    };

    setCartTemplate(phoneCart);
  }, [id]);

  const handleActiveImage = (ind: number) => {
    setActiveImage(ind);
  };

  const handleColor = (uniqueKey: string) => {
    setActiveColor(uniqueKey);
  };

  const handleCapacity = (uniqueKey: string) => {
    setActiveCapacity(uniqueKey);
  };

  return (

    <div className="phone">
      <div className="phone__breadcrumbs">
        <span className="phone__home-logo" />
        <span className="phone__location">Phones</span>
        <span className="phone__model-name">{name}</span>
      </div>
      <Link to="/phones" className="phone__link-back">Back</Link>
      <div className="phone__main">
        <h3 className="phone__title">{name}</h3>
        <div className="phone__top-block">
          <div className="phone__images">
            <div className="phone__sidebar-images">
              {
                images.map((imgThumb, ind) => (
                  <button
                    key={images[ind]}
                    type="button"
                    className="phone__btn-img"
                    onClick={() => handleActiveImage(ind)}
                  >
                    <img
                      className="phone__thumb-img"
                      src={
                        `/img/phones/${namespaceId}/${activeColor}/0${ind}.jpg`
                      }
                      alt={`img_${colorId}_${ind}`}
                    />
                  </button>
                ))
              }
            </div>
            <img
              src={
                `/img/phones/${namespaceId}/${activeColor}/0${activeImage}.jpg`
              }
              alt="main_img"
              className="phone__main-image"
            />
          </div>
          <div className="phone__options">
            <div className="phone__options-wrapper">
              <form action="/" className="phone__form">
                <div className="phone__colors-option">
                  <h4 className="phone__spec-title">Available colors</h4>
                  <ul className="phone__colors">
                    {
                      colorsAvailable
                        .map(color => (
                          <li
                            className="phone__color-item"
                            key={color}
                          >
                            <button
                              type="button"
                              // eslint-disable-next-line max-len
                              className={cx('phone__color-btn', { 'phone__color-btn--active': activeColor === color })}
                              style={{
                                backgroundColor: `${colours[color]}`,
                              }}
                              onClick={() => handleColor(color)}
                            />
                          </li>
                        ))
                    }
                  </ul>
                </div>
                <div className="phone__capacity">
                  <h4 className="phone__spec-title">Select capacity</h4>
                  <div className="phone__capacity-available">
                    {
                      capacityAvailable.map(item => (
                        <button
                          key={`${item}capacity`}
                          type="button"
                          onClick={() => handleCapacity(item)}
                          // eslint-disable-next-line max-len
                          className={cx('phone__capacity-opt', { 'phone__capacity-opt--active': activeCapacity === item })}
                        >
                          {item}
                        </button>
                      ))
                    }
                  </div>
                </div>
                <div className="phone__price-option">
                  <div className="phone__price">
                    <span className="phone__price-new">
                      $
                      {priceDiscount}
                    </span>
                    <span className="phone__price-old">
                      $
                      {priceRegular}
                    </span>
                  </div>
                  <div className="phone__btns">
                    <button
                      disabled={inCartChecker(id, cart)}
                      type="button"
                      className={cx('phone__cart', {
                        'phone__cart--active': inCartChecker(id, cart),
                      })}
                      onClick={() => handleCart(id)}
                    >
                    Add to cart
                    </button>
                    <button
                      disabled={inFavouritesChecker(id, favourites)}
                      type="button"
                      className={cx('phone__favourites', {
                        // eslint-disable-next-line max-len
                        'phone__favourites--active': inFavouritesChecker(id, favourites),
                      })}
                      onClick={() => handleFavourites(id)}
                    />
                  </div>
                </div>
              </form>

              <div className="phone__param">
                <div className="phone__screen block">
                  <span className="left-top">Screen</span>
                  <span className="right-top">
                    {screen}
                  </span>
                </div>
                <div className="phone__resolution block">
                  <span className="left-top">Resolution</span>
                  <span className="right-top">
                    {resolution}
                  </span>
                </div>
                <div className="phone__processor block">
                  <span className="left-top">Processor</span>
                  <span className="right-top">
                    {processor}
                  </span>
                </div>
                <div className="phone__ram block">
                  <span className="left-top">RAM</span>
                  <span className="right-top">
                    {ram}
                  </span>
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
            <div className="phone__specs-box block">
              <span className="left-bottom">Screen</span>
              <span className="right-bottom">{screen}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">Resolution</span>
              <span className="right-bottom">{resolution}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">Processor</span>
              <span className="right-bottom">{processor}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">RAM</span>
              <span className="right-bottom">{ram}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">Built in memory</span>
              <span className="right-bottom">{capacity}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">Camera</span>
              <span className="right-bottom">{camera}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">zoom</span>
              <span className="right-bottom">{zoom}</span>
            </div>
            <div className="phone__specs-box block">
              <span className="left-bottom">Cell</span>
              <span className="right-bottom">
                {
                  cell.map((tech, ind) => (
                    <span
                      className="phone__cell"
                      key={tech}
                    >
                      {ind !== 0 && (',')}
                      {tech}
                    </span>
                  ))
                }
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

const mapStateToProps = (state: {
  favouritesReducer: FavouritesState;
  cartReducer: CartState;
}) => ({
  favourites: getFavourites(state.favouritesReducer),
  cart: getCart(state.cartReducer),
});

const mapDispatchToProps = {
  setFavourites,
  setCart,
};

export const PhoneDetais
  = connect(mapStateToProps, mapDispatchToProps)(PhoneDetaisTemplate);
