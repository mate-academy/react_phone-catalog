import './Header.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { LangContext } from '../../context/LangContext';
import { Lang } from '../../types/enumLang';
import { translate } from '../../utils/translate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { navigationSlice } from '../../features/navigationSlice';

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { lang, setLang } = useContext(LangContext);
  const { favouriteGoods } = useAppSelector(state => state.favourites);
  const { cartGoods } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const handleBurger = () => {
    setIsMenu(prev => !prev);
  };

  const handleTheme = () => {
    const themeToggleButton = document.querySelector('.icon--theme');
    const appElement = document.querySelector('.App');

    if (themeToggleButton && appElement) {
      appElement.classList.toggle('theme--dark');
    }

    setIsMenu(false);
  };

  return (
    <div className={classNames('header', { 'full--height': isMenu })}>
      <div
        className={classNames('header__container', {
          'header__container--visible': isMenu,
        })}
      >
        <div className="header__top">
          <div className="header__top--logo-with-menu">
            <Logo />
            <div className="nav__link nav__link--burger">
              <div
                className={classNames('icon icon__nav icon--burger-menu', {
                  'menu--close': isMenu,
                })}
                onClick={handleBurger}
              ></div>
            </div>
          </div>
          <nav className={classNames('nav', { 'nav--visible': isMenu })}>
            <ul className="nav__list">
              <li className="list__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    dispatch(navigationSlice.actions.clearLinks());
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="list__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(navigationSlice.actions.addLink('phones'));
                  }}
                >
                  {translate('header.phones', lang)}
                </NavLink>
              </li>
              <li className="list__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(navigationSlice.actions.addLink('tablets'));
                  }}
                >
                  {translate('header.tablets', lang)}
                </NavLink>
              </li>
              <li className="list__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    classNames('nav__link', { 'is-active': isActive })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(navigationSlice.actions.addLink('accessories'));
                  }}
                >
                  {translate('header.accessories', lang)}
                </NavLink>
              </li>
              <li className="list__item">
                <div className="nav__link--lang nav__link--with-menu">
                  <span
                    className={classNames('nav__link--en', {
                      'is-active': lang === 'en',
                    })}
                    onClick={() => {
                      setLang(Lang.EN);
                      setIsMenu(false);
                    }}
                  >
                    EN
                  </span>{' '}
                  |{' '}
                  <span
                    className={classNames('nav__link--it', {
                      'is-active': lang === 'it',
                    })}
                    onClick={() => {
                      setLang(Lang.IT);
                      setIsMenu(false);
                    }}
                  >
                    IT
                  </span>
                </div>
              </li>
              <li className="list__item">
                <div className="nav__link nav__link--with-menu">
                  <div onClick={handleTheme}>
                    {translate('header.theme', lang)}
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={classNames('header__icons', { 'icons--visible': isMenu })}
        >
          <div className="nav__link--lang">
            <span
              className={classNames('nav__link--en', {
                'is-active': lang === 'en',
              })}
              onClick={() => {
                setLang(Lang.EN);
                setIsMenu(false);
              }}
            >
              EN
            </span>{' '}
            |{' '}
            <span
              className={classNames('nav__link--it', {
                'is-active': lang === 'it',
              })}
              onClick={() => {
                setLang(Lang.IT);
                setIsMenu(false);
              }}
            >
              IT
            </span>
          </div>

          <div className="nav__link nav__link--theme">
            <div
              className="icon icon__nav icon--theme"
              onClick={handleTheme}
            ></div>
          </div>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames('nav__link nav__link--heart', {
                'is-active': isActive,
              })
            }
            onClick={() => {
              setIsMenu(false);
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.addLink('favourite'));
            }}
          >
            <div
              data-count={favouriteGoods.length}
              className={classNames('icon icon__nav icon--heart', {
                'has-items': favouriteGoods.length > 0,
              })}
            ></div>
          </NavLink>
          <NavLink
            to="/cart"
            data-count={cartGoods.length}
            className={({ isActive }) =>
              classNames('nav__link nav__link--basket', {
                'is-active': isActive,
                'has-items': cartGoods.length > 0,
              })
            }
            onClick={() => {
              setIsMenu(false);
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.addLink('cart'));
            }}
          >
            <div
              data-count={cartGoods.length}
              className={classNames('icon icon__nav icon--basket', {
                'has-items': cartGoods.length > 0,
              })}
            ></div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
