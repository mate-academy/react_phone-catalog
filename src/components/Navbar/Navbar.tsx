import React, { useState } from 'react';
import { NavLink, Link, useSearchParams, useLocation } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './Navbar.scss';
import { SCREEN_SIZES } from '../../styles/utils/icons/screenSizes';
import classNames from 'classnames';
import { useMenuContext } from '../MenuContext';
import { useDeviceContext } from '../DeviceContext/DeviceContext';
import { SearchParams, getSearchWith } from '../ProductsPages/searchHelper';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { CustomSelect } from '../utils/CustomSelect';
import { useThemeContext } from '../../ThemeContext/ThemeContext';

const getLanguage = () => {
  return localStorage.getItem('language');
};

const setLanguage = () => {
  const lan = getLanguage();

  if (lan === 'uk') {
    return 'UA';
  }

  if (lan === 'en') {
    return 'EN';
  }

  return 'EN';
};

export const Navbar: React.FC = () => {
  const { setIsMenuOpen } = useMenuContext();
  const { shoppingCart, favourites } = useDeviceContext();
  const { toggleTheme, theme } = useThemeContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(searchQuery);
  const { t } = useTranslation();
  const [value, setValue] = useState(setLanguage || 'EN');
  const location = useLocation();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debouncedSearch = debounce((val: string) => {
    if (val.trim() === '') {
      setSearchParams({});
    } else {
      setSearchWith({ query: val });
    }
  }, 500);

  const handleSearchDebounced = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    handleSearch(e);
    debouncedSearch(val);
  };

  const isProductsPage = () => {
    return location.pathname.startsWith('/products');
  };

  const optionsLanguage = [
    { value: 'EN', label: 'EN' },
    { value: 'UA', label: 'UA' },
  ];

  const saveLanguage = (language: string) => {
    localStorage.setItem('language', language);
  };

  const handleChangeLanguage = (val: string) => {
    switch (val) {
      case 'EN':
        i18next.changeLanguage('en');
        saveLanguage('en');
        setValue('EN');
        break;

      case 'UA':
        i18next.changeLanguage('uk');
        saveLanguage('uk');
        setValue('UA');
        break;

      default:
        i18next.changeLanguage('en');
        setValue('EN');
    }
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar__menu">
        <div className="navbar__logo">
          <a href="" className="icon icon--logo"></a>
        </div>
        <MediaQuery minWidth={SCREEN_SIZES.tabletMin}>
          <div className="navbar__menu--list">
            <NavLink
              to={'home'}
              className={({ isActive }) =>
                classNames('navbar__menu--link uppercase', {
                  active: isActive,
                })
              }
            >
              {t('Home')}
            </NavLink>
            <NavLink
              to={'/products/phones'}
              className={({ isActive }) =>
                classNames('navbar__menu--link uppercase', {
                  active: isActive,
                })
              }
            >
              {t('Phones')}
            </NavLink>
            <NavLink
              to={'/products/tablets'}
              className={({ isActive }) =>
                classNames('navbar__menu--link uppercase', {
                  active: isActive,
                })
              }
            >
              {t('Tablets')}
            </NavLink>
            <NavLink
              to={'/products/accessories'}
              className={({ isActive }) =>
                classNames('navbar__menu--link uppercase', {
                  active: isActive,
                })
              }
            >
              {t('Accessories')}
            </NavLink>
          </div>
        </MediaQuery>

        {isProductsPage() && (
          <input
            type="search"
            className="search"
            value={query}
            placeholder={t('Search')}
            onChange={handleSearchDebounced}
          />
        )}
      </div>
      <div className="navbar__buttons">
        <button
          onClick={toggleTheme}
          className={`toggleTheme toggleTheme--${theme}`}
        ></button>
        <CustomSelect
          options={optionsLanguage}
          value={value}
          onChange={handleChangeLanguage}
          className="navbar__buttons--select"
        />
        <MediaQuery minWidth={SCREEN_SIZES.tabletMin}>
          <Link
            to={{
              pathname: '/favourites',
            }}
            state={{ from: location.pathname }}
            className="navbar__button"
          >
            <div className="icon icon--favourites">
              {!!favourites.length && (
                <div className="counter body-text">{favourites.length}</div>
              )}
            </div>
          </Link>
          <Link
            to={{
              pathname: '/cart',
            }}
            state={{ from: location.pathname }}
            className="navbar__button"
          >
            <div className="icon icon--cart">
              {!!shoppingCart.length && (
                <div className="counter">{shoppingCart.length}</div>
              )}
            </div>
          </Link>
        </MediaQuery>
        <MediaQuery maxWidth={SCREEN_SIZES.mobileMax}>
          <div className="navbar__buttons">
            <MediaQuery minWidth={SCREEN_SIZES.tabletMin}>
              <Link
                to={{
                  pathname: '/favourites',
                }}
                state={{ from: location.pathname }}
                className="navbar__button"
              >
                <div className="icon icon--favourites">
                  {!!favourites.length && (
                    <div className="counter body-text">{favourites.length}</div>
                  )}
                </div>
              </Link>
              <Link
                to={{
                  pathname: '/cart',
                }}
                state={{ from: location.pathname }}
                className="navbar__button"
              >
                <div className="icon icon--cart">
                  {!!shoppingCart.length && (
                    <div className="counter">{shoppingCart.length}</div>
                  )}
                </div>
              </Link>
            </MediaQuery>
            <MediaQuery maxWidth={SCREEN_SIZES.mobileMax}>
              <button
                className="navbar__button icon icon--menu"
                onClick={() => setIsMenuOpen(true)}
              />
            </MediaQuery>
          </div>
        </MediaQuery>
      </div>
    </nav>
  );
};
