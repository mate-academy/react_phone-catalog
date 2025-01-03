import { NavLink, useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import './Header.scss';
import Logo from '../../images/homePage/Logo.svg';
import Logo_dark from '../../images/homePage/Logo_dark.svg';
import Logo_blue from '../../images/homePage/Logo_blue.svg';
import Favorites from '../../images/homePage/Favorites.svg';
import favImage from '../../images/favImage.svg';
import favImage_blue from '../../images/favImage_blue.svg';
import favImage_purple from '../../images/favImage_purple.svg';
import favImage_orange from '../../images/favImage_orange.svg';
import Heart_dark from '../../images//homePage/Heart_dark.svg';
import Cart from '../../images/homePage/Cart.svg';
import Cart_dark from '../../images/homePage/Cart_dark.svg';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import debounce from 'lodash.debounce';
import { newObject, ThemeVars } from '../../types/themeTypes';
import { actions as actionsToggle } from '../../features/themeSlice';
import { actions as actionsSearch } from '../../features/seacrchSlice';

export const Header: React.FC = () => {
  const { favProducts } = useAppSelector(state => state.favourites);
  const { cartProducts } = useAppSelector(state => state.cartItems);
  const dispatch = useAppDispatch();

  const [appliedQuery, setAppliedQuery] = useState('');
  const visibleSearch = useAppSelector(state => state.search.visibleSearch);

  const applyQueryInStore = useCallback(
    debounce((value) => {
      dispatch(actionsSearch.setQuery(value));
    }, 1000),
    [],
  );

  const handleQuery = (value: string) => {
    setAppliedQuery(value.toLowerCase());
  };

  useEffect(() => {
    applyQueryInStore(appliedQuery);
  }, [appliedQuery])

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

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const selectedLogo = () => {
    switch(theme) {
      case ThemeVars.DARK:
        return Logo_dark;
      
      case ThemeVars.ORIGIN:
        return Logo;

      case ThemeVars.BLUE:
        return Logo_blue;

      default:
        return Logo;
    }
  };

  const selectFavImg = () => {
    switch(theme) {
      case ThemeVars.DARK:      
      case ThemeVars.ORIGIN:
        return favImage;

      case ThemeVars.BLUE:
        return favImage_blue;

      case ThemeVars.PURPLE:
        return favImage_purple;

      case ThemeVars.ORANGE:
        return favImage_orange;

      default:
        return favImage;
    }
  }

  const [page, setPage] = useState('');

  const location = useLocation();
  let paths = location.pathname.split('/').filter(path => path).toString();

  useEffect(() => {
    if (paths === 'favourites') {
      setPage('favourites')
    } else if (paths === 'cart') {
      setPage('cart')
    } else {
      setPage('') 
    }
  }, [paths])
  
  const selectedCart = theme === ThemeVars.DARK ? Cart_dark : Cart;
  const selectedHeart = theme === ThemeVars.DARK ? Heart_dark : Favorites;
  
  const burgerGround = `header__burger theme-${theme}`;
  const burgerClass = `header__burger__link theme-${theme}`;
  const burgerCross = `header__burger__cross theme-${theme}`
  const rootClass = `header__link theme-${theme}`;
  const headerTopLine = `theme-${theme}`;
  const headerLine = `header__preferies__link theme-${theme}`;
  const heardBorder = `header__border theme-${theme}`
  const headerInput = `header__search__input theme-${theme}`;
  const themeSelect = `header__theme__select theme-${theme}`;
  const themeOption = `header__theme__option theme-${theme}`;
  const themeVars: ThemeVars[] = Object.values(ThemeVars);
  
  return (
    <div className={classNames('header__wrapp', {
      'header__wrap--active': opened === true,
    })}>
    <header
      className={classNames('header', headerTopLine, {
        'header--active': opened === true,
      })}
    >
      <div className="header__block">
        <div className="header__top-head">
          <NavLink to="/" onClick={handlePage}>
            <img className="header__logo" src={selectedLogo()} alt="logo" />
          </NavLink>
        </div>

        <button className={burgerGround} onClick={handleChange}>
          {opened ? (
            <a href="#" className={burgerCross} title="menu"></a>
          ) : (
            <a href="#" className={burgerClass} title="menu"></a>
          )}
        </button>

        <ul
          className={classNames('header__top-heads', {
            'header__top-heads--active': opened === true,
          })}
        >
          <NavLink to="/" className={rootClass} onClick={handlePage}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={rootClass} onClick={handlePage}>
            PHONES
          </NavLink>
          <NavLink
            to="/tablets"
            className={rootClass}
            onClick={handlePage}
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            className={`${rootClass} header__link--accessories`}
            onClick={handlePage}
          >
            ACCESSORIES
          </NavLink>
        </ul>
      </div>
      <div
        className={classNames('header__preferies', {
          'header__preferies--active': opened === true,
        })}
      > 
        <div className={headerLine}>
          <NavLink
            to="/favourites"
            className={classNames(`${heardBorder} header__border__favorites`, 
            page === 'favourites' ? `header__border__favorites--active` : ''
            )}
            onClick={handlePage}
          >
            <img
              className="header__favoritesImg"
              src={selectedHeart}
              alt="Favorite"
            />
            {favProducts.length > 0 && (
              <div className="header__favCount">
                <div className="header__favoritesLength">
                  {favProducts.length}
                </div>
                <img
                  className="header__favoritesFavImage"
                  src={selectFavImg()}
                  alt="favImage"
                />
              </div>
            )}
          </NavLink>
        </div>
        <div className={headerLine}>
          <NavLink 
            to="/cart" 
            className={classNames(`${heardBorder} header__border__cart`, 
              page === 'cart' ? `header__border__cart--active` : ''
            )}
            onClick={handlePage}
          >
            <img 
              className="header__favoritesImg" 
              src={selectedCart} 
              alt="cart" 
            />
            {cartProducts.length > 0 && (
              <div className="header__favCount">
                <div className="header__favoritesLength">
                  {cartProducts.length}
                </div>
                <img
                  className="header__favoritesFavImage"
                  src={selectFavImg()}
                  alt="favImage"
                />
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
      <div className="header__searchTheme">
        {visibleSearch
          ? (
            <div className='header__search'>
              <input
                className={headerInput}
                type="search"
                placeholder='Search...'
                value={appliedQuery}
                onChange={event => handleQuery(event.target.value)}
              >
              </input>
            </div>
          )
          : null
        }
        <div className='header__theme'>
          <label className='header__theme__label'>
            <select 
              name='select-theme' 
              id="select"
              className={themeSelect}
              defaultValue={theme}
            >
              {themeVars.map(topic => (
                <option
                  key={topic}
                  value={topic}
                  onClick={() => dispatch(actionsToggle.toggleTheme(topic))}
                  className={themeOption}
                >
                  {newObject[topic]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};
