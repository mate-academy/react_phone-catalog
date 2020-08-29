import React, { FC, useState } from 'react';
import {
  NavLink, Route, HashRouter, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  RootState, getCurrentPhone, loadPhone, like,
} from '../store';

import PhonePage from './PhonePage';
import { PhoneOfPhones } from '../interfaces/interfaces';

type Props = {
  phone: PhoneOfPhones;
  phoneLoad: (id: string) => void;
  setLike: (phoneId: string) => void;
};

const ProductCard: FC<Props> = ({ phone, phoneLoad, setLike }) => {
  const [liked, setLiked] = useState(false);

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
          <button
            type="button"
            className="productCard__btn--cart"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="productCard__btn--favs"
            onClick={() => {
              setLike(phone.phoneId);
              setLiked(!liked);
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
});

const mapDispatch = {
  phoneLoad: loadPhone,
  setLike: like,
};

export default connect(mapState, mapDispatch)(ProductCard);
