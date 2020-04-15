import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './_PhoneThumb.scss';
import cx from 'classnames';
import {
  PhoneInterface,
  FavouritesState,
  CartState,
  CartInterface,
} from '../../constants/types';
import { setFavourites, setCart } from '../../store/actionCreators';
import { getFavourites } from '../../store/reducers/favouritesReducer';
import { getCart } from '../../store/reducers/cartReducer';
import { inFavouritesChecker, inCartChecker } from '../../utils/api';

interface Props {
  favourites: string[];
  cart: CartInterface[];
  data: PhoneInterface;
  setFavourites: (id: string) => void;
  setCart: (id: CartInterface) => void;
}

export const PhoneThumbTemplate: FC<Props> = (props) => {
  const {
    image,
    phoneId,
    name,
    id,
    priceDiscount,
    priceRegular,
    ram,
    capacity,
    screen,
  } = props.data;

  const {
    setFavourites: setFavouritesTemplate,
    setCart: setCartTemplate,
    favourites,
    cart,
  } = props;

  const handleFavourites = useCallback((uniqueKey: string) => {
    setFavouritesTemplate(uniqueKey);
  }, [phoneId]);

  const handleCart = useCallback((uniqueKey: string) => {
    const phoneCart = {
      id: uniqueKey,
      amount: 1,
      imgLink: image,
      price: priceDiscount,
    };

    setCartTemplate(phoneCart);
  }, [phoneId]);

  return (
    <>
      <img src={`${image}`} alt="phone__photo" className="phoneThumb__img" />
      <div className="phoneThumb__info-top">
        <Link
          key={id}
          to={`/phones/${phoneId}`}
          className="phone__link-details"
        >
          <h3 className="phoneThumb__title">{name}</h3>
        </Link>
        <div className="phoneThumb__block">
          <span className="phoneThumb__price-dis">
              $
            {priceDiscount}
          </span>
          <span className="phoneThumb__price-reg">
              $
            {priceRegular}
          </span>
        </div>
      </div>
      <div className="phoneThumb__info-main">
        <div className="phoneThumb__block-spec">
          <span className="left">Screen</span>
          <span className="right">{screen}</span>
        </div>
        <div className="phoneThumb__block-spec">
          <span className="left">Capacity</span>
          <span className="right">{capacity}</span>
        </div>
        <div className="phoneThumb__block-spec">
          <span className="left">RAM</span>
          <span className="right">{ram}</span>
        </div>
      </div>
      <div className="phoneThumb__action-btns">
        <button
          disabled={inCartChecker(phoneId, cart)}
          type="button"
          className={cx('phoneThumb__btn-cart',
            {
              'phoneThumb__btn-cart--active': inCartChecker(phoneId, cart),
            })}
          onClick={() => handleCart(phoneId)}
        >
            Add to cart
        </button>
        <button
          disabled={inFavouritesChecker(phoneId, favourites)}
          type="button"
          className={cx('phoneThumb__btn-favourites',
            {
              // eslint-disable-next-line max-len
              'phoneThumb__btn-favourites--active': inFavouritesChecker(phoneId, favourites),
            })}
          onClick={() => handleFavourites(phoneId)}
        />
      </div>

    </>
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

// eslint-disable-next-line max-len
export const PhoneThumb = connect(mapStateToProps, mapDispatchToProps)(PhoneThumbTemplate);
