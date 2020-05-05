import React, { FC, useCallback, useState, useEffect } from 'react';
import './_Navigation.scss';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { setQuery } from '../../store/actionCreators';
import {
  CartInterface,
  FavouritesState,
  CartState,
} from '../../constants/types';
import { getCart, getCartTrigger } from '../../store/reducers/cartReducer';
import { getFavourites } from '../../store/reducers/favouritesReducer';
import imageHeart from '../../assets/heart.svg';
import imageCart from '../../assets/shopcart.svg';

interface Props {
  setQuery: (value: string) => void;
  cart: CartInterface[];
  favourites: string[];
  cartTrigger: boolean;
}

const Navigation: FC<Props> = (props) => {
  const {
    setQuery: setQueryTemplate,
    favourites,
    cart,
    cartTrigger,
  } = props;

  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [mobView, setMobView] = useState(false);

  const handleToggle = () => {
    if (toggle === false) {
      document.body.classList.add('blockScroll');
      setToggle(true);
    } else {
      document.body.classList.remove('blockScroll');
      setToggle(false);
    }
  };

  const searchWithDelay = useCallback(
    debounce(setQueryTemplate, 200),
    [],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    searchWithDelay(value.toLowerCase());
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('blockScroll');
    };
  }, []);

  useEffect(() => {
    if (width < 1023) {
      setMobView(true);
    } else {
      setMobView(false);
    }
  }, [width]);

  return (
    <nav className="nav">
      <ul
        id="nav-left"
        className={cx('nav__list-left', {
          activeCart: cartTrigger === true && mobView !== true,
          'nav__list-left--active': toggle === true,
        })}
      >
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/"
            activeClassName="nav__link-left--active"
            exact
          >
                  home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/phones"
            activeClassName="nav__link-left--active"
          >
                phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/tablets"
            activeClassName="nav__link-left--active"
            exact
          >
                tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link-left"
            to="/accessories"
            activeClassName="nav__link-left--active"
            exact
          >
                accessories
          </NavLink>
        </li>
      </ul>
      <ul className="nav__list-right">
        <li className={cx('nav__item-input', {
          activeCart: cartTrigger === true,
        })}
        >
          <input
            type="text"
            className="nav__search"
            placeholder="Search....."
            onChange={handleSearch}
          />
        </li>
        <li className={cx('nav__item-right box-fav-rel', {
          activeCart: cartTrigger === true,
        })}
        >
          <NavLink
            className="nav__link-right"
            to="/favourites"
            activeClassName="nav__link-right--active"
          >
            <img
              src={imageHeart}
              alt="link_to_favourites"
              className="nav__favourites"
            />
            {favourites.length > 0 && (
              <span className="nav__red-circle">{favourites.length}</span>
            )}
          </NavLink>
        </li>
        <li className="nav__item-right box-cart-rel">
          <NavLink
            className="nav__link-right"
            to="/cart"
            activeClassName="nav__link-right--active"
          >
            <img
              src={imageCart}
              alt="link_to_cart"
              className="nav__store"
            />
            {cart.length > 0 && (
              <span className="nav__red-circle">{cart.length}</span>
            )}
          </NavLink>
        </li>
        <li className="nav__item-right nav__item-right--mobile">
          <button
            onClick={handleToggle}
            type="button"
            className={cx('nav__btn-mobile', {
              'nav__btn-mobile--active': toggle === true,
            })}
          >
            <div className="line" />
            <div className="line" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: {
  favouritesReducer: FavouritesState;
  cartReducer: CartState;
}) => ({
  favourites: getFavourites(state.favouritesReducer),
  cart: getCart(state.cartReducer),
  cartTrigger: getCartTrigger(state.cartReducer),
});

const mapDispatchToProps = { setQuery };

// eslint-disable-next-line max-len
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
