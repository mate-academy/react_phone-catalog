import React, { FC } from 'react';
import {
  NavLink, HashRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  RootState, like, getFavs, getCart, addToCart, loadPhone,
} from '../store';

import { PhoneOfPhones } from '../interfaces/interfaces';

type Props = {
  phone: PhoneOfPhones;
  favs: any;
  cart: any;
  setLike: (phoneId: string) => void;
  setToCart: (phoneId: string) => void;
  setCurrentPhone: (id: string) => void;
};

const ProductCard: FC<Props> = ({
  phone, setLike, setToCart, setCurrentPhone, favs, cart,
}) => {
  const liked = favs.find((fav: string) => fav === phone.phoneId);
  const addedToCart = cart.find((item: { id: string }) => item.id === phone.phoneId);

  return (
    <HashRouter>
      <div className="productCard">
        <NavLink
          to={`/phones/${phone.phoneId}`}
          className="productCard__link"
          onClick={() => setCurrentPhone(phone.phoneId)}
        >
          <div className="productCard__img-container">
            <img
              src={phone.image}
              alt={phone.name}
              className="productCard__img"
            />
          </div>
          <p className="productCard__title">
            {phone.name}
          </p>
        </NavLink>
        <h2 className="productCard__discount">
          $
          {phone.priceDiscount}
          &nbsp;
          <span className="productCard__price">
            $
            {phone.priceRegular}
          </span>
        </h2>
        <div className="productCard__description">
          <p className="productCard__info">
            Screen
          </p>
          <p className="productCard__characteristics">
            {phone.screen}
          </p>
        </div>
        <div className="productCard__description">
          <p className="productCard__info">
            Capacity
          </p>
          <p className="productCard__characteristics">
            {phone.capacity}
          </p>
        </div>
        <div className="productCard__description">
          <p className="productCard__info">
            RAM
          </p>
          <p className="productCard__characteristics">
            {phone.ram}
          </p>
        </div>
        <div className="productCard__btn">
          {
            addedToCart
              ? (
                <button
                  type="button"
                  className="productCard__btn--added"
                  disabled
                >
                  Added to cart
                </button>
              )
              : (
                <button
                  type="button"
                  className="productCard__btn--cart"
                  onClick={() => {
                    setToCart(phone.phoneId);
                  }}
                >
                  Add to cart
                </button>
              )
          }
          <button
            type="button"
            className="productCard__btn--favs"
            onClick={() => {
              setLike(phone.phoneId);
            }}
          >
            {
              liked
                ? <img src="img/favs-liked.svg" alt="favs logo" />
                : <img src="img/favs.svg" alt="favs logo" />
            }
          </button>
        </div>
      </div>
    </HashRouter>
  );
};

const mapState = (state: RootState) => ({
  favs: getFavs(state),
  cart: getCart(state),
});

const mapDispatch = {
  setLike: like,
  setToCart: addToCart,
  setCurrentPhone: loadPhone,
};

export default connect(mapState, mapDispatch)(ProductCard);
