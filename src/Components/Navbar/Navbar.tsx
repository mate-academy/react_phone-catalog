import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SearchContext } from '../../variables/contexts';
import { RootState } from '../../redux/store';
import { Navigation } from '../Navigation';
import './Navbar.scss';
import { Menu } from '../Menu';

export const Navbar = () => {
  const {
    query,
    setQuery,
    isSearchVisible,
    placeholder,
    applyQuery,
  } = useContext(SearchContext);

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  const items = useSelector((state: RootState) => state.cart.items);
  const itemsInFavorite
    = useSelector((state: RootState) => state.favorite.itemInFavorite);

  const totalLength = items.length;

  const handleClick = (type: string) => {
    switch (type) {
      case 'close':
        applyQuery('');
        setQuery('');
        setIsOpenSearch(false);
        break;

      case 'open':
        setIsOpenSearch(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <header className="header page__section-header">
        <div className="header__left-box">
          <Link
            to="/home"
            className="logo header__logo"
          >
            <img
              src="img/Icons/logo.svg"
              alt="my-phone-logo"
              className="logo__img"
            />
          </Link>
          <Navigation />
        </div>
        <div className="header__right-box">
          <div className="header__box-item header__box-item--menu">
            <button
              type="button"
              className="header__menu-button"
              onClick={() => setMenuActive(!menuActive)}
            >
              <div className="header__menu-img" />
            </button>
          </div>
          {isSearchVisible && (
            isOpenSearch ? (
              <div className="header__box-input">
                <input
                  type="text"
                  className="header__input"
                  value={query || ''}
                  placeholder={placeholder}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    applyQuery(event.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleClick('close')}
                  className="header__input-button"
                >
                  <div className="header__input-img" />
                </button>
              </div>
            ) : (
              <div className="header__box-item header__box-item--disabled">
                <button
                  type="button"
                  onClick={() => handleClick('open')}
                  className="header__input-button"
                >
                  <div className="header__input-img" />
                </button>
              </div>
            )
          )}
          <NavLink
            to="/favourites"
            className={({ isActive }) => classNames(
              'header__box-item',
              { 'header__box-item--active': isActive },
            )}
          >
            <div
              className={classNames(
                {
                  'header__box-wrapper-favorite': itemsInFavorite.length,
                },
              )}
              data-count-favorite={itemsInFavorite.length}
            >
              <img
                src="img/Icons/heart.svg"
                alt="favorite"
                className="header__box-image"
              />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => classNames(
              'header__box-item',
              { 'header__box-item--active': isActive },
            )}
          >
            <div
              className={classNames(
                {
                  'header__box-wrapper-cart': totalLength,
                },
              )}
              data-count-cart={totalLength}
            >
              <img
                src="img/Icons/cart.svg"
                alt="cart"
                className="header__box-image"
              />
            </div>
          </NavLink>
        </div>
      </header>
      {menuActive && (
        <Menu
          menuActive={menuActive}
          setMenuActive={setMenuActive}
        />
      )}
    </>
  );
};
