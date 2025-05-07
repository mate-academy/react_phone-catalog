import styles from './Header.module.scss';
import stylesNav from '../../styles/nav.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesTheme from '../../styles/theme.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { LangContext } from '../../context/LangContext';
import { Lang } from '../../types/enumLang';
import { translate } from '../../utils/translate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { navigationSlice } from '../../features/navigationSlice';
import { SearchForm } from '../SearchForm/SearchForm';
import { querySlice } from '../../features/querySlice';
import { themeSlice } from '../../features/themeSlice';

export const Header = () => {
  const currentUrl = useLocation();
  const [isMenu, setIsMenu] = useState(false);
  const { lang, setLang } = useContext(LangContext);
  const { favoriteGoods } = useAppSelector(state => state.favorites);
  const { cartGoods } = useAppSelector(state => state.cart);
  const { darkTheme } = useAppSelector(state => state.darkTheme);
  const dispatch = useAppDispatch();

  const handleBurger = () => {
    setIsMenu(prev => !prev);
  };

  const handleTheme = () => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      bodyElement.classList.toggle(stylesTheme.theme__dark);
      dispatch(themeSlice.actions.setDarkTheme(darkTheme ? false : true));
    }

    setIsMenu(false);
  };

  return (
    <div
      className={classNames(styles.header, { [styles.full__height]: isMenu })}
    >
      <div
        className={classNames(styles.header__container, {
          [styles.header__container__visible]: isMenu,
        })}
      >
        <div className={styles.header__top}>
          <div className={styles.header__top__logoWithMenu}>
            <Logo />
            <div className={styles.header__top__search__menu}>
              <div className={styles.header__searchWithMenu}>
                {(currentUrl.pathname === '/phones' ||
                  currentUrl.pathname === '/tablets' ||
                  currentUrl.pathname === '/accessories') && <SearchForm />}
              </div>
              <div
                className={`${stylesNav.nav__link} ${stylesNav.nav__link__burger}`}
              >
                <div
                  className={classNames(
                    stylesIcon.icon,
                    stylesIcon.icon__nav,
                    darkTheme
                      ? stylesIcon.icon__burgerMenu__dark
                      : stylesIcon.icon__burgerMenu,
                    {
                      [stylesIcon.menu__close]: isMenu,
                    },
                  )}
                  onClick={handleBurger}
                ></div>
              </div>
            </div>
          </div>
          <nav
            className={classNames(stylesNav.nav, {
              [stylesNav.nav__visible]: isMenu,
            })}
          >
            <ul className={stylesNav.nav__list}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames(stylesNav.nav__link, {
                      [stylesNav.isActive]: isActive,
                    })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(querySlice.actions.setQuery(''));
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    classNames(stylesNav.nav__link, {
                      [stylesNav.isActive]: isActive,
                    })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    window.scrollTo(0, 0);
                    dispatch(querySlice.actions.setQuery(''));
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(navigationSlice.actions.addLink('phones'));
                  }}
                >
                  {translate('header.phones', lang)}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    classNames(stylesNav.nav__link, {
                      [stylesNav.isActive]: isActive,
                    })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    window.scrollTo(0, 0);
                    dispatch(querySlice.actions.setQuery(''));
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(navigationSlice.actions.addLink('tablets'));
                  }}
                >
                  {translate('header.tablets', lang)}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    classNames(stylesNav.nav__link, {
                      [stylesNav.isActive]: isActive,
                    })
                  }
                  onClick={() => {
                    setIsMenu(false);
                    window.scrollTo(0, 0);
                    dispatch(querySlice.actions.setQuery(''));
                    dispatch(navigationSlice.actions.clearLinks());
                    dispatch(navigationSlice.actions.addLink('accessories'));
                  }}
                >
                  {translate('header.accessories', lang)}
                </NavLink>
              </li>
              <li>
                <div
                  className={`${stylesNav.nav__link__lang} ${stylesNav.nav__link__withMenu}`}
                >
                  <span
                    className={classNames(stylesNav.nav__link__en, {
                      [stylesNav.active]: lang === 'en',
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
                    className={classNames(stylesNav.nav__link__it, {
                      [stylesNav.active]: lang === 'it',
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
              <li>
                <div
                  className={`${stylesNav.nav__link} ${stylesNav.nav__link__withMenu}`}
                >
                  <div onClick={handleTheme}>
                    {translate('header.theme', lang)}
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={classNames(styles.header__icons, {
            [styles.icons__visible]: isMenu,
          })}
        >
          <div className={stylesNav.nav__link__lang}>
            <span
              className={classNames(stylesNav.nav__link__en, {
                [stylesNav.active]: lang === 'en',
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
              className={classNames(stylesNav.nav__link__it, {
                [stylesNav.active]: lang === 'it',
              })}
              onClick={() => {
                setLang(Lang.IT);
                setIsMenu(false);
              }}
            >
              IT
            </span>
          </div>
          <div
            className={`${styles.header__searchWithIcons} ${stylesNav.nav__link}`}
          >
            {(currentUrl.pathname === '/phones' ||
              currentUrl.pathname === '/tablets' ||
              currentUrl.pathname === '/accessories') && <SearchForm />}
          </div>
          <div
            className={`${stylesNav.nav__link} ${stylesNav.nav__link__theme}`}
          >
            <div
              className={`${stylesIcon.icon} ${stylesIcon.icon__nav} ${darkTheme ? stylesIcon.icon__theme__dark : stylesIcon.icon__theme}`}
              onClick={handleTheme}
            ></div>
          </div>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(stylesNav.nav__link, stylesNav.nav__link__heart, {
                [stylesNav.isActive]: isActive,
              })
            }
            onClick={() => {
              setIsMenu(false);
              window.scrollTo(0, 0);
              dispatch(querySlice.actions.setQuery(''));
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.addLink('favorite'));
            }}
          >
            <div
              data-count={favoriteGoods.length}
              className={classNames(
                stylesIcon.icon,
                stylesIcon.icon__nav,
                darkTheme
                  ? stylesIcon.icon__heart__dark
                  : stylesIcon.icon__heart,
                {
                  [stylesIcon.hasItems]: favoriteGoods.length > 0,
                },
              )}
            ></div>
          </NavLink>
          <NavLink
            to="/cart"
            data-count={cartGoods.length}
            className={({ isActive }) =>
              classNames(stylesNav.nav__link, stylesNav.nav__link__basket, {
                [stylesNav.isActive]: isActive,
                hasItems: cartGoods.length > 0,
              })
            }
            onClick={() => {
              setIsMenu(false);
              window.scrollTo(0, 0);
              dispatch(querySlice.actions.setQuery(''));
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.addLink('cart'));
            }}
          >
            <div
              data-count={cartGoods.length}
              className={classNames(
                stylesIcon.icon,
                stylesIcon.icon__nav,
                darkTheme
                  ? stylesIcon.icon__basket__dark
                  : stylesIcon.icon__basket,
                {
                  [stylesIcon.hasItems]: cartGoods.length > 0,
                },
              )}
            ></div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
