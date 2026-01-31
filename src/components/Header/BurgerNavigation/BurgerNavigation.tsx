/* eslint max-len: "off" */
import { Link, useLocation } from 'react-router-dom';
import './BurgerNavigation.scss';
import React, { useContext, useEffect } from 'react';
import { useCurrentPath } from '../../context/PathContext';
import { CardAndFavouritesContext } from '../../context/CardAndFavouritesContext';
import { useTheme } from '../../context/ThemeContext';
import classNames from 'classnames';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

export const BurgerNavigation: React.FC<Props> = ({
  isBurgerMenu,
  onClose,
}) => {
  const { pathname, search } = useCurrentPath();
  const location = useLocation();
  const context = useContext(CardAndFavouritesContext);
  const { favourites, card } = context;
  const { theme } = useTheme();

  const STORAGE_KEY_LAST_PAGE = 'lastNonCardOrFavPage';

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSOIRES', path: '/accessoires' },
  ];

  const itemInFavourites = favourites.length;
  const totalQuantity = card.reduce((sum, item) => sum + item.quantity, 0);

  const saveLastPage = () => {
    if (
      !location.pathname.startsWith('/card') &&
      !location.pathname.startsWith('/favourites')
    ) {
      sessionStorage.setItem(
        STORAGE_KEY_LAST_PAGE,
        location.pathname + location.search,
      );
    }
  };

  useEffect(() => {
    if (isBurgerMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isBurgerMenu]);

  const handleNavigate = (withScroll = false) => {
    saveLastPage();
    onClose();

    if (withScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`menu_navigator ${isBurgerMenu ? 'is-open' : ''}`}>
      <div className="menu__container">
        <ul className="menu__list">
          {pages.map(({ title, path }) => (
            <li className="menu__list--item" key={title}>
              <Link
                className={classNames('menu__list--link', {
                  'is-active':
                    path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={{ pathname: path, search }}
                onClick={() => handleNavigate(true)}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__footer">
          <div
            className={classNames('menu__icon--container', {
              'is-active': pathname == '/favourites',
            })}
          >
            <Link
              className="menu__icon--link"
              to="/favourites"
              onClick={() => handleNavigate()}
            >
              <img
                src={
                  theme === 'light'
                    ? import.meta.env.BASE_URL + 'img/icons/Favourites_icon.svg'
                    : import.meta.env.BASE_URL + 'img/icons/Favourites_icon.svg' //PLS!!! Add dark icon
                }
                alt="Favourites icon"
                className="icon"
              />
              {itemInFavourites > 0 && (
                <div className="menu__quantity--box">
                  <div className="menu__quantity">{itemInFavourites}</div>
                </div>
              )}
            </Link>
          </div>
          <div
            className={classNames('menu__icon--container', {
              'is-active': pathname === '/card',
            })}
          >
            <Link
              className="menu__icon--link"
              to="/card"
              onClick={() => handleNavigate}
            >
              <img
                src={
                  theme === 'light'
                    ? import.meta.env.BASE_URL +
                      'img/icons/Shopping-bag_icon.svg'
                    : import.meta.env.BASE_URL +
                      'img/icons/Shopping-bag_icon.svg' //PLS!!! Add dark icon
                }
                alt="Shopping bag icon"
                className="icon"
              />
              {totalQuantity > 0 && (
                <div className="menu__quantity--box">
                  <div className="menu__quantity">{totalQuantity}</div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
