import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleTheme } from '../../features/theme/themeSlice';
import { nav } from '../../utils/navigation';
import { Counter } from '../Counter';
import { Logo } from '../Logo'
import './burgerMenu.scss';

interface Props {
  isMenuClicked: boolean;
  setIsMenuClicked: (isMenuClicked: boolean) => void;
}

export const BurgerMenu: FC<Props> = ({ isMenuClicked, setIsMenuClicked }) => {
  const theme = useAppSelector(state => state.theme.value);
  const { pathname } = useLocation();
  const shoppingCart = useAppSelector(state => state.shoppingCart.value);
  const favoriteProductsLength
  = useAppSelector(state => state.favoriteProducts.value).length;
  const dispatch = useAppDispatch();
  const quantityOfProductsInShoppingCart = useMemo(() => {
    return shoppingCart.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
  }, [shoppingCart]);

  useEffect(() => {
    document.body.style.overflowY
      = isMenuClicked ? 'hidden' : 'visible'
  }, [isMenuClicked]);

  const handleSwitchTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div 
      className={classNames('burger-menu', `burger-menu--${theme}`, { 'burger-menu--opened': isMenuClicked })}
    >
      <header className={`burger-menu__header burger-menu__header--${theme}`}>
        <Logo header/>

        <button
          className={`header__icon header__icon--${theme}`}
          onClick={() => setIsMenuClicked(false)}
        >
          {theme === 'light' ? (
            <img src="new/img/icons/close-button-dark.svg" alt="Burger menu" />
          ) : (
            <img src="new/img/icons/close-button-light.svg" alt="Burger menu" />
          )}
        </button>
      </header>

      <div className="burger-menu__interaction-container">
        <Link
          onClick={() => setIsMenuClicked(false)}
          to="/favorites"
          className={
            classNames(`header__icon header__icon--${theme} burger-menu__icon`)
          }
        >
          {theme === 'light' ? (
            <img
              src="new/img/icons/favorites-icon-dark.svg"
              alt="Favorites products"
            />
          ) : (
            <img
              src="new/img/icons/favorites-icon-light.svg"
              alt="Favorites products"
            />
          )}
          <Counter count={favoriteProductsLength} theme={theme} />
        </Link>
        <Link
          onClick={() => setIsMenuClicked(false)}
          to="/shopping-cart"
          className={
            classNames(`header__icon header__icon--${theme} burger-menu__icon`)
          }
        >
          {theme === 'light' ? (
            <img
              src="new/img/icons/shopping-bag-icon-dark.svg"
              alt="Shopping bag"
            />
          ) : (
            <img
              src="new/img/icons/shopping-bag-icon-light.svg"
              alt="Shopping bag"
            />
          )}
          <Counter count={quantityOfProductsInShoppingCart} theme={theme} />
        </Link>
        <button
          type="button"
          className={`header__icon header__icon--${theme} burger-menu__icon`}
          onClick={handleSwitchTheme}
        >
          {theme === 'light' ? (
            <img
              className="header__image"
              src="new/img/icons/moon.svg"
              alt="Change theme"
            />
          ) : (
            <img
              className="header__image"
              src="new/img/icons/sun.svg"
              alt="Change theme"
            />
          )}
        </button>
      </div>

      <ul className="burger-menu__nav-list">
          {nav.map(({ name, to }) => (
            <li
              className='burger-menu__nav-item'
              key={name}
            >
              <Link
                onClick={() => setIsMenuClicked(false)}
                to={to}
                className={
                  classNames(
                    `burger-menu__nav-link burger-menu__nav-link--${theme}`,
                    { [`burger-menu__nav-link--highlighted__${theme}`]: pathname === to || (pathname.includes(to) && to !== '/') },
                  )
                }
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}
