import './Header.scss';
import classNames from 'classnames';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../../store/GlobalContext';
import { iconsObject } from '../../../constants/iconsObject';
import { Icon } from '../Icon';
import { navLinks } from '../../../constants/navLinks';
import { getSearchWith } from '../../../utils/searchHelper';

const getActiveItem = ({ isActive }: { isActive: boolean }) =>
  classNames('header__item', { 'header__item--active': isActive });

const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames('header__icon', { 'header__icon--active': isActive });

export const Header: React.FC = () => {
  const { cart, favorites, toggleMenu, isMenuOpen, theme, toggleTheme } =
    useContext(GlobalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const initialQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (inputValue.trim() === '') {
        setSearchParams(prevParams => {
          const newParams = new URLSearchParams(prevParams);

          newParams.delete('query');

          return newParams;
        });
      } else {
        const updatedParams = getSearchWith(searchParams, {
          query: inputValue,
        });

        setSearchParams(updatedParams);
      }
    }, 1000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputValue, searchParams, setSearchParams]);

  useEffect(() => {
    setInputValue('');
  }, [location.pathname]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue('');
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('query');

      return newParams;
    });
  };

  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        {theme === 'light' ? (
          <img src="logo.svg" alt="Nice Gadgets" className="header__logo" />
        ) : (
          <img
            src="logo_dark.svg"
            alt="Nice Gadgets"
            className="header__logo"
          />
        )}
      </Link>

      <div className="header__menu">
        <div className="header__list">
          {navLinks.map(link => (
            <NavLink to={link.path} key={link.title} className={getActiveItem}>
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="header__buttons-right">
        {location.pathname !== '/' && (
          <div className="header__search-wrapper">
            <input
              type="text"
              placeholder="Search product..."
              className="header__search-input"
              value={inputValue}
              onChange={handleInputChange}
            />
            {inputValue ? (
              <div className="header__clear-button" onClick={clearInput}>
                {theme === 'light' ? (
                  <Icon icon={iconsObject.close} />
                ) : (
                  <Icon icon={iconsObject.close_dark} />
                )}
              </div>
            ) : theme === 'light' ? (
              <Icon icon={iconsObject.search} />
            ) : (
              <Icon icon={iconsObject.search_dark} />
            )}
          </div>
        )}
        <div onClick={toggleMenu} className="header__icon header__icon--menu">
          {isMenuOpen ? (
            theme === 'light' ? (
              <Icon icon={iconsObject.close} />
            ) : (
              <Icon icon={iconsObject.close_dark} />
            )
          ) : theme === 'light' ? (
            <Icon icon={iconsObject.menu} />
          ) : (
            <Icon icon={iconsObject.menu_dark} />
          )}
        </div>

        <button
          className="header__icon header__switch-theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>

        <div
          className={classNames('header__buttons-wrapper', {
            'header__buttons-wrapper--bottom': isMenuOpen,
          })}
        >
          <NavLink className={getActiveIcon} to="/favorites">
            <div className="header__icon-wrapper">
              <span className="header__quantity">{totalFavorites}</span>
              {theme === 'light' ? (
                <Icon icon={iconsObject.favorites} />
              ) : (
                <Icon icon={iconsObject.favorites_dark} />
              )}
            </div>
          </NavLink>

          <NavLink className={getActiveIcon} to="/cart">
            <div className="header__icon-wrapper">
              {theme === 'light' ? (
                <Icon icon={iconsObject.shopping_cart} />
              ) : (
                <Icon icon={iconsObject.shopping_cart_dark} />
              )}
              {totalQuantity > 0 && (
                <span className="header__quantity">{totalQuantity}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
