import { NavLink } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import './Header.scss';
import Logo from '../../images/homePage/Logo.svg';
import Favorites from '../../images/homePage/Favorites.svg';
import favImage from '../../images/favImage.svg';
import Cart from '../../images/homePage/Cart.svg';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/seacrchSlice';
import debounce from 'lodash.debounce';

export const Header: React.FC = () => {
  const { favProducts } = useAppSelector(state => state.favourites);
  const { cartProducts } = useAppSelector(state => state.cartItems);
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.search.query);
  const [appliedQuery, setAppliedQuery] = useState('');
  const visibleSearch = useAppSelector(state => state.search.visibleSearch);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleQuery = (value: string) => {
    dispatch(actions.setQuery(value));
    applyQuery(value.toLowerCase());
  };

  const [opened, setOpened] = useState(false);
  
  const handlePage = () => {
    setOpened(false);
  };

  const handleChange = () => {
    if (opened === false) {
      setOpened(true);
    }

    if (opened === true) {
      setOpened(false);
    }
  };

  return (
    <header
      className={classNames('header', {
        'header--active': opened === true,
      })}
    >
      <div className="header__block">
        <div className="header__top-head">
          <NavLink to="/" onClick={handlePage}>
            <img className="header__logo" src={Logo} alt="logo" />
          </NavLink>
        </div>

        <button className="header__burger" onClick={handleChange}>
          {opened ? (
            <a href="#" className="header__burger__cross" title="menu"></a>
          ) : (
            <a href="#" className="header__burger__link" title="menu"></a>
          )}
        </button>

        <ul
          className={classNames('header__top-heads', {
            'header__top-heads--active': opened === true,
          })}
        >
          <NavLink to="/" className="header__home" onClick={handlePage}>
            HOME
          </NavLink>
          <NavLink to="/phones" className="header__phones" onClick={handlePage}>
            PHONES
          </NavLink>
          <NavLink
            to="/tablets"
            className="header__tablets"
            onClick={handlePage}
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            className="header__accessories"
            onClick={handlePage}
          >
            ACCESSORIES
          </NavLink>
        </ul>
      </div>
        {visibleSearch
          ? (
            <div className='header__input'>
              <input
                className='header__input__item'
                type="search"
                placeholder='Search...'
                value={query}
                onChange={event => handleQuery(event.target.value)}
              >
              </input>
            </div>
          )
          : null
        }
      <div
        className={classNames('header__preferies', {
          'header__preferies--active': opened === true,
        })}
      > 
        <div className="header__preferies__link">
          <NavLink
            to="/favourites"
            className="header__heart header__heart--favorites"
          >
            <img
              className="header__favoritesImg"
              src={Favorites}
              alt="Favorite"
            />
            <div className="header__favoritesLength">{favProducts.length}</div>
            {favProducts.length !== 0 && (
              <img
                className="header__favoritesFavImage"
                src={favImage}
                alt="favImage"
              />
            )}
          </NavLink>
        </div>
        <div className="header__preferies__link">
          <NavLink to="/cart" className="header__heart header__heart--cart">
            <img className="header__favoritesImg" src={Cart} alt="cart" />
            <div className="header__favoritesLength">{cartProducts.length}</div>
            {cartProducts.length !== 0 && (
              <img
                className="header__favoritesFavImage"
                src={favImage}
                alt="favImage"
              />
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
