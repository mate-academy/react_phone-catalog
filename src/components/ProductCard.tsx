import React, { FC } from 'react';
import {
  NavLink, Route, HashRouter, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  RootState, getCurrentPhone, loadPhone, like, getFavs, getCart, addToCart,
} from '../store';

import PhonePage from './PhonePage';
import { PhoneOfPhones } from '../interfaces/interfaces';

type Props = {
  phone: PhoneOfPhones;
  favs: any;
  cart: any;
  phoneLoad: (id: string) => void;
  setLike: (phoneId: string) => void;
  setToCart: (phoneId: string) => void;
};

const ProductCard: FC<Props> = ({
  phone, phoneLoad, setLike, favs, cart, setToCart,
}) => {
  const liked = favs.find((fav: string) => fav === phone.phoneId);
  const addedToCart = cart.find((item: string) => item === phone.phoneId);

  return (
    <HashRouter>
      <div className="productCard">
        <NavLink
          to={`/phones/${phone.phoneId}`}
          className="productCard__link"
          onClick={() => phoneLoad(phone.phoneId)}
        >
          <img
            src={phone.image}
            alt={phone.name}
            className="productCard__img"
          />
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
      <Switch>
        <Route path={`/phones/${phone.phoneId}`} exact component={PhonePage} />
      </Switch>
    </HashRouter>
  );
};

const mapState = (state: RootState) => ({
  currentPhone: getCurrentPhone(state),
  favs: getFavs(state),
  cart: getCart(state),
});

const mapDispatch = {
  phoneLoad: loadPhone,
  setLike: like,
  setToCart: addToCart,
};

export default connect(mapState, mapDispatch)(ProductCard);
