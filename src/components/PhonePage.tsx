/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Title from './Title';
import { Phone, Phones } from '../interfaces/interfaces';
import {
  RootState, getCurrentPhone, getAllPhones, like, addToCart, getFavs, getCart, getBrandNewPhones,
} from '../store';
import Breadcrumbs from './Breadcrumbs';
import ProductSlider from './ProductSlider';

type Props = {
  phoneId: string;
  phone: Phone;
  phones: Phones[];
  favs: any;
  cart: any;
  brandNewPhones: Phones[];
  setLike: (phoneId: string) => void;
  setToCart: (phoneId: string) => void;
};

const PhonePage: FC<Props> = ({
  phone, phones, setLike, setToCart, favs, cart, brandNewPhones,
}) => {
  const [currentImage, setCurrentImage] = useState(phone.images[0]);
  const liked = favs.find((fav: string) => fav === phone.id);
  const addedToCart = cart.find((item: { id: string }) => item.id === phone.id);
  const picturesChanger = (e: { target: { src: React.SetStateAction<string> } }) => (
    setCurrentImage(e.target.src)
  );

  const idGenerator = (min: number, max: number) => {
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  };

  return (
    <div className="phone">
      <Breadcrumbs title="Phones" subtitle={phone.name} />

      <NavLink to="/" className="phone__breadcrumb-link">
        <div className="phone__breadcrumb">
          <img
            src="img/icons/breadcrumbs-arrow.svg"
            alt="back icon"
            className="phone__breadcrumb-arrow"
          />
          <p className="phone__breadcrumb-text">Back</p>
        </div>
      </NavLink>

      <Title title={phone.name} />

      <div className="phone__main">
        <div className="phone__gallery">
          <ul
            className="phone__gallery-list"
            onClick={() => picturesChanger}
            onKeyPress={() => picturesChanger}
          >
            {phone.images.map(image => (
              <li className="phone__gallery-item" key={image}>
                <img
                  src={image}
                  alt="phone pic"
                  className="phone__gallery-img"
                />
              </li>
            ))}
          </ul>

          <div className="phone__gallery-item-large">
            <img
              src={currentImage}
              alt="phone pic"
              className="phone__gallery-img-large"
            />
          </div>
        </div>

        <div className="phone__card">
          <div className="phone__card-block">
            <p className="phone__label">
              Available colors
            </p>
            <div className="phone__colors">
              {phone.colorsAvailable.map(color => (
                <div className="phone__color-wrapper" key={color}>
                  <div style={{ backgroundColor: color }} className="phone__color" />
                </div>
              ))}
            </div>
          </div>

          <div className="phone__card-block">
            <p className="phone__label">
              Select capacity
            </p>
            <div className="phone__capacities">
              {phone.capacityAvailable.map(size => (
                <div className="phone__capacity">
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="phone__price-block">
            <div className="phone__discount">
              $
              {
              phones.find(product => product.phoneId === phone.id)?.priceDiscount
              }
            </div>
            <div className="phone__price">
              $
              {
                phones.find(product => product.phoneId === phone.id)?.priceRegular
              }
            </div>
          </div>

          <div className="phone__btn-block">
            {
              addedToCart
                ? (
                  <button
                    type="button"
                    className="phone__btn--added"
                    disabled
                  >
                    Added to cart
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="phone__btn--cart"
                    onClick={() => {
                      setToCart(phone.id);
                    }}
                  >
                    Add to cart
                  </button>
                )
            }
            <button
              type="button"
              className="phone__btn--favs"
              onClick={() => {
                setLike(phone.id);
              }}
            >
              {
                liked
                  ? <img src="img/favs-liked.svg" alt="favs logo" />
                  : <img src="img/favs.svg" alt="favs logo" />
              }
            </button>
          </div>

          <div className="phone__info-block">
            <div className="phone__info-keys">
              <p className="phone__info-key">
                Screen
              </p>
              <p className="phone__info-key">
                Resolution
              </p>
              <p className="phone__info-key">
                Processor
              </p>
              <p className="phone__info-key">
                RAM
              </p>
            </div>
            <div className="phone__info-values">
              <p className="phone__info-value">
                {phone.screen}
              </p>
              <p className="phone__info-value">
                {phone.resolution}
              </p>
              <p className="phone__info-value">
                {phone.processor}
              </p>
              <p className="phone__info-value">
                {phone.ram}
              </p>
            </div>
          </div>
        </div>

        <div className="phone__id">
          ID:
          {' '}
          {idGenerator(800000, 1000000)}
        </div>
      </div>

      <div className="phone__description">
        <div className="phone__about">
          <h2 className="phone__subtitle">About</h2>
          {phone.description.map(text => (
            <>
              <h3 className="phone__subsubtitle">{text.title}</h3>
              <p className="phone__text">{text.text}</p>
            </>
          ))}
        </div>

        <div className="phone__specs">
          <h2 className="phone__subtitle">Tech specs</h2>
          <div className="phone__characteristics">
            <div className="phone__characteristics-keys">
              <p className="phone__characteristics-key">
                Screen
              </p>
              <p className="phone__characteristics-key">
                Resolution
              </p>
              <p className="phone__characteristics-key">
                Processor
              </p>
              <p className="phone__characteristics-key">
                RAM
              </p>
              <p className="phone__characteristics-key">
                Built in memory
              </p>
              <p className="phone__characteristics-key">
                Camera
              </p>
              <p className="phone__characteristics-key">
                Zoom
              </p>
              <p className="phone__characteristics-key">
                Cell
              </p>
            </div>
            <div className="phone__characteristics-values">
              <p className="phone__characteristics-value">
                {phone.screen}
              </p>
              <p className="phone__characteristics-value">
                {phone.resolution}
              </p>
              <p className="phone__characteristics-value">
                {phone.processor}
              </p>
              <p className="phone__characteristics-value">
                {phone.ram}
              </p>
              <p className="phone__characteristics-value">
                {phone.capacity}
              </p>
              <p className="phone__characteristics-value">
                {phone.camera}
              </p>
              <p className="phone__characteristics-value">
                {phone.zoom}
              </p>
              <p className="phone__characteristics-value">
                {phone.cell}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home__slider-wrapper">
        <Title title="You may also like" />
        <ProductSlider phones={brandNewPhones} />
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  phone: getCurrentPhone(state),
  phones: getAllPhones(state),
  favs: getFavs(state),
  cart: getCart(state),
  brandNewPhones: getBrandNewPhones(state),
});

const mapDispatch = {
  setLike: like,
  setToCart: addToCart,
};

export default connect(mapState, mapDispatch)(PhonePage);
