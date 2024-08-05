import classNames from 'classnames';
import './Header.scss';
import './../../styles/message-counter.scss';
import { Link, NavLink } from 'react-router-dom';
import { DispatchContext } from '../../../utils/GlobalStateProvider';
import { memo, useContext, useMemo } from 'react';
import { Product } from '../types/Product';

type Props = {
  isMenuOpened: boolean;
  cartItems: Product[];
  likedItems: Product[];
  isDarkThemeOn: boolean;
  countItems: { id: number; count: number }[];
};

// eslint-disable-next-line react/display-name
export const Header: React.FC<Props> = memo(
  ({ isDarkThemeOn, isMenuOpened, cartItems, likedItems, countItems }) => {
    const dispatch = useContext(DispatchContext);

    const toggleMenu = () => {
      dispatch({ type: 'setIsMenuOpened', payload: !isMenuOpened });
    };

    const itemsInCart = useMemo(
      () => countItems.map(e => e.count).reduce((e1, e2) => e1 + e2, 0),
      [countItems],
    );

    return (
      <header
        className={classNames('header', { 'header-light': !isDarkThemeOn })}
        id="top"
      >
        <div className="header__wrapper">
          <div className="header__logo">
            <Link to="/home">
              {isDarkThemeOn ? (
                <img
                  className="header__logo-icon"
                  src="./img/header/Logo.svg"
                />
              ) : (
                <img
                  className="header__logo-icon"
                  src="./img/header/Logo-dark.svg"
                />
              )}
            </Link>
          </div>
          <nav className="header__nav">
            <ul>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames('header__link', {
                    'header__link--active': isActive,
                  })
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  classNames('header__link', {
                    'header__link--active': isActive,
                  })
                }
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  classNames('header__link', {
                    'header__link--active': isActive,
                  })
                }
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  classNames('header__link', {
                    'header__link--active': isActive,
                  })
                }
              >
                Accessories
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="header__cart">
          <button
            className="header__cart-theme"
            onClick={() =>
              dispatch({ type: 'setIsDarkThemeOn', payload: !isDarkThemeOn })
            }
          >
            {isDarkThemeOn ? (
              <img src="img/icons/moon.png" alt="moon" />
            ) : (
              <img src="img/icons/sun.svg" alt="sun" />
            )}
          </button>
          <button
            className={classNames(
              'header__cart-icon',
              isDarkThemeOn
                ? 'header__cart-icon--like'
                : 'header__cart-icon--like-dark',
            )}
          >
            <NavLink
              to={'favourites'}
              className={({ isActive }) =>
                isActive
                  ? 'header__cart-link header__link--active'
                  : 'header__cart-link'
              }
            >
              {likedItems.length > 0 && (
                // eslint-disable-next-line max-len
                <small className="message-counter">{likedItems.length}</small>
              )}
            </NavLink>
          </button>
          <button
            className={classNames(
              'header__cart-icon',
              isDarkThemeOn
                ? 'header__cart-icon--bag'
                : 'header__cart-icon--bag-dark',
            )}
          >
            <NavLink
              to={'cart'}
              className={({ isActive }) =>
                isActive
                  ? 'header__cart-link header__link--active'
                  : 'header__cart-link'
              }
            >
              {cartItems.length > 0 && (
                // eslint-disable-next-line max-len
                <small className="message-counter">{itemsInCart}</small>
              )}
            </NavLink>
          </button>
          <button
            onClick={toggleMenu}
            className={classNames(
              'header__cart-icon',
              isMenuOpened
                ? isDarkThemeOn
                  ? 'header__cart-icon--close'
                  : 'header__cart-icon--close header__cart-icon--close-dark'
                : isDarkThemeOn
                  ? 'header__cart-icon--menu'
                  : 'header__cart-icon--menu-dark',
            )}
          ></button>
        </div>
      </header>
    );
  },
);
