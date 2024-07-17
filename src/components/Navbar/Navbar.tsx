import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/nuce-gadgets-logo.png';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { CartContext } from '../../store/CartContext';
import { LikedContext } from '../../store/FavouritesContext';
import { Search } from '../Search';
import i18next from 'i18next';
import { Lang } from '../../types/Languages';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const Navbar = () => {
  const cartState = useContext(CartContext);
  const favouritesState = useContext(LikedContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { t } = useTranslation();

  const mobileMenuPosition = showMenu ? `0%` : `-110%`;
  const mobileMenuHeight = window.innerHeight - 49;
  const mobileMenuEvent = showMenu ? 'all' : 'none';

  const changeLang = () => {
    const nextLang = i18next.language === Lang.UK ? Lang.EN : Lang.UK;

    i18next.changeLanguage(nextLang);
  };

  return (
    <header className="header">
      <div className="header__top">
        <Link
          to="/home"
          className="header__logo"
          onClick={() => setShowMenu(false)}
          aria-label={t(TRANSLATIONS.logo.ariaLabel)}
        >
          <img
            src={logo}
            alt={t(TRANSLATIONS.logo.alt)}
            className="header__logo-img"
          />
        </Link>

        <div
          className={classNames('header__navigation', {
            'visually-hidden': showMenu,
          })}
        >
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames('nav__link', {
                      'nav__link--active': isActive,
                    })
                  }
                  aria-label={t(TRANSLATIONS.nav.home.ariaLabel)}
                >
                  {t(TRANSLATIONS.nav.home.text)}
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    classNames('nav__link', {
                      'nav__link--active': isActive,
                    })
                  }
                  aria-label={t(TRANSLATIONS.nav.phones.ariaLabel)}
                >
                  {t(TRANSLATIONS.nav.phones.text)}
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    classNames('nav__link', {
                      'nav__link--active': isActive,
                    })
                  }
                  aria-label={t(TRANSLATIONS.nav.tablets.ariaLabel)}
                >
                  {t(TRANSLATIONS.nav.tablets.text)}
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    classNames('nav__link', {
                      'nav__link--active': isActive,
                    })
                  }
                  aria-label={t(TRANSLATIONS.nav.accessories.ariaLabel)}
                >
                  {t(TRANSLATIONS.nav.accessories.text)}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__actions">
          {!showMenu && <Search />}

          <button
            onClick={changeLang}
            className={classNames('header__lang btn btn--menu', {
              'visually-hidden': showMenu,
            })}
            aria-label={t(TRANSLATIONS.header.actions.lang.ariaLabel)}
          >
            {t(TRANSLATIONS.header.actions.lang.text)}
          </button>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames('header__favorites btn--menu icon--favorites', {
                'nav__link--active': isActive,
                'visually-hidden': showMenu,
              })
            }
            aria-label={t(TRANSLATIONS.header.actions.favourites.ariaLabel)}
          >
            {!!favouritesState.length && (
              <div className="counter">{favouritesState.length}</div>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames('header__cart btn--menu icon--cart', {
                'nav__link--active': isActive,
                'visually-hidden': showMenu,
              })
            }
            aria-label={t(TRANSLATIONS.header.actions.cart.ariaLabel)}
          >
            {!!cartState.length && (
              <div className="counter">{cartState.length}</div>
            )}
          </NavLink>
          <button
            type="button"
            className="header__menu btn btn--menu"
            onClick={() => setShowMenu(!showMenu)}
            aria-label={
              showMenu
                ? t(TRANSLATIONS.header.actions.menu.ariaLabel.close)
                : t(TRANSLATIONS.header.actions.menu.ariaLabel.open)
            }
          >
            <span
              className={classNames('icon', {
                'icon--menu': !showMenu,
                'icon--close': showMenu,
              })}
            ></span>
          </button>
        </div>
      </div>

      <div
        className={classNames('header__mobile-menu', {
          'header__mobile-menu--active': showMenu,
        })}
        style={{
          translate: `0 ${mobileMenuPosition}`,
          height: `${mobileMenuHeight}px`,
          pointerEvents: mobileMenuEvent,
        }}
      >
        <nav className="nav nav--mobile-menu">
          <ul className="nav__list nav__list--mobile-menu">
            <li className="nav__item nav__item--mobile-menu">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames('nav__link', {
                    'nav__link--active': isActive,
                  })
                }
                onClick={() => setShowMenu(false)}
                aria-label={t(TRANSLATIONS.nav.home.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.home.text)}
              </NavLink>
            </li>

            <li className="nav__item nav__item--mobile-menu">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames('nav__link', {
                    'nav__link--active': isActive,
                  })
                }
                onClick={() => setShowMenu(false)}
                aria-label={t(TRANSLATIONS.nav.phones.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.phones.text)}
              </NavLink>
            </li>

            <li className="nav__item nav__item--mobile-menu">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames('nav__link', {
                    'nav__link--active': isActive,
                  })
                }
                onClick={() => setShowMenu(false)}
                aria-label={t(TRANSLATIONS.nav.tablets.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.tablets.text)}
              </NavLink>
            </li>

            <li className="nav__item nav__item--mobile-menu">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames('nav__link', {
                    'nav__link--active': isActive,
                  })
                }
                onClick={() => setShowMenu(false)}
                aria-label={t(TRANSLATIONS.nav.accessories.ariaLabel)}
              >
                {t(TRANSLATIONS.nav.accessories.text)}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions header__actions--mobile-menu">
          <button
            onClick={changeLang}
            className="header__lang header__lang--mobile-menu btn btn--menu"
            aria-label={t(TRANSLATIONS.header.actions.lang.ariaLabel)}
          >
            {t(TRANSLATIONS.header.actions.lang.text)}
          </button>

          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(
                // eslint-disable-next-line max-len
                'header__favorites header__favorites--mobile-menu btn--menu icon--favorites',
                {
                  'nav__link--active': isActive,
                },
              )
            }
            onClick={() => setShowMenu(false)}
            aria-label={t(TRANSLATIONS.header.actions.favourites.ariaLabel)}
          >
            {!!favouritesState.length && (
              <div className="counter counter--mobile-menu">
                {favouritesState.length}
              </div>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(
                'header__cart header__cart--mobile-menu btn--menu icon--cart',
                {
                  'nav__link--active': isActive,
                },
              )
            }
            onClick={() => setShowMenu(false)}
            aria-label={t(TRANSLATIONS.header.actions.cart.ariaLabel)}
          >
            {!!cartState.length && (
              <div className="counter counter--mobile-menu">
                {cartState.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
