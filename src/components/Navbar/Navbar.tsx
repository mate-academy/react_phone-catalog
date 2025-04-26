import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './Navbar.scss';
import { useTranslation } from 'react-i18next';
import { Menu } from './Menu/Menu';
import { useCart } from '../Context/CartContext';
import { useFavourites } from '../Context/FavouritesContext';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';
import { totalQuantity } from '../../utils/CartUtils';

type Props = {
  setIsOverflow: (value: boolean) => void;
  isOverflow: boolean;
};

export const Navbar: React.FC<Props> = ({ setIsOverflow, isOverflow }) => {
  const { t, i18n } = useTranslation();
  const { cartList } = useCart();
  const { favouriteList } = useFavourites();
  const cartItems = cartList ? Object.values(cartList) : [];

  const hasActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link', {
      'nav__link--active': isActive,
      'nav__link--hover': !isActive,
    });

  const hasActiveLinkIcon = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link__icon', { 'nav__link--active': isActive });

  const [elementWidth, setElementWidth] = useState(window.innerWidth);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const quantity = totalQuantity(cartItems);

  useEffect(() => {
    const navElement = navRef.current;

    if (!navElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setElementWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(navElement);

    return () => {
      resizeObserver.unobserve(navElement);
    };
  }, []);

  useEffect(() => {
    setIsMenuVisible(false);
    document.body.classList.remove('no-scroll');
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    setIsOverflow(!isOverflow);
    if (!isMenuVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (lng: string) => {
    setSearchParams({ lang: lng });
  };

  return (
    <>
      <nav
        data-cy="top-bar"
        className="top-bar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="nav" ref={navRef}>
          <div className="nav__main">
            <NavLink aria-current="page" to="/">
              <div className="icon__logo"></div>
            </NavLink>

            {elementWidth > 639 && (
              <div className="nav__links">
                <NavLink
                  className={hasActiveLink}
                  to={`/?lang=${currentLanguage}`}
                >
                  {t('pageName.0')}
                </NavLink>
                <NavLink
                  className={hasActiveLink}
                  to={`/phones?lang=${currentLanguage}`}
                >
                  {t('pageName.1')}
                </NavLink>
                <NavLink
                  className={hasActiveLink}
                  to={`/tablets?lang=${currentLanguage}`}
                >
                  {t('pageName.2')}
                </NavLink>
                <NavLink
                  className={hasActiveLink}
                  to={`/accessories?lang=${currentLanguage}`}
                >
                  {t('pageName.3')}
                </NavLink>
              </div>
            )}
          </div>

          <div className="icon__container">
            <ThemeSwitcher />
            <div className="change-lang">
              <button
                className={classNames('change-lang__button', {
                  'change-lang__button--active': currentLanguage === 'en',
                })}
                onClick={() => currentLanguage !== 'en' && changeLanguage('en')}
                disabled={currentLanguage === 'en'}
              >
                en
              </button>

              <button
                className={classNames('change-lang__button', {
                  'change-lang__button--active': currentLanguage === 'ua',
                })}
                onClick={() => currentLanguage !== 'ua' && changeLanguage('ua')}
                disabled={currentLanguage === 'ua'}
              >
                ua
              </button>
            </div>
            {elementWidth > 639 ? (
              <>
                <NavLink
                  className={hasActiveLinkIcon}
                  to={`/favourites?lang=${currentLanguage}`}
                >
                  <div className="icon__with-number">
                    <div className="icon icon--favorites"></div>
                    {favouriteList && favouriteList.length > 0 && (
                      <p className="icon--text">{favouriteList.length}</p>
                    )}
                  </div>
                </NavLink>
                <NavLink
                  className={hasActiveLinkIcon}
                  to={`/cart?lang=${currentLanguage}`}
                >
                  <div className="icon__with-number">
                    <div className="icon icon--cart"></div>
                    {quantity > 0 && <p className="icon--text">{quantity}</p>}
                  </div>
                </NavLink>
              </>
            ) : (
              <div
                className={classNames('icon', {
                  'icon--close': isMenuVisible,
                  'icon--menu': !isMenuVisible,
                })}
                onClick={toggleMenu}
              ></div>
            )}
          </div>
        </div>
      </nav>
      {isMenuVisible && (
        <div className="menu-block">
          <Menu />
        </div>
      )}
    </>
  );
};
