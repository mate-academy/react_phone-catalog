import ThemeButton from './ThemeButton/ThemeButton';
import { LangButton } from './LangButton/LangButton';
import { Logo } from '../Icons/Logo';
import { LogoCart } from '../Icons/IconCart';
import { NavList } from './NavList/NavList';
import { IconFavorites } from '../Icons/IconFavorites';
import style from './Header.module.scss';
import { useContext } from 'react';
import { BreakPointsContext } from '../../store/BreakPointsProvider';
import { IconBurger } from '../Icons/IconBurger';
import { Link, useLocation } from 'react-router-dom';
import { StateContext } from '../../store/StateProvider';
import classNames from 'classnames';
import { Pathname } from '../../enums/Pathname';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';

export const Header = () => {
  const { isLaptop } = useContext(BreakPointsContext);
  const { setActiveMenu, favorites } = useContext(StateContext);
  const { cartItems } = useContext(ShoppingCartContext);
  const { pathname } = useLocation();

  return (
    <header className={style.header}>
      <nav className={style.header__top}>
        <div className={style.header__leftNav}>
          <Link to="../" className={style.header__link}>
            <Logo className={style.header__logo} />
          </Link>
          {!isLaptop && <NavList />}
        </div>

        <ul className={style.header__actions}>
          {!isLaptop ? (
            <div className={style.header__actionsWrapper}>
              <div className={style.header__topBtn}>
                <LangButton />
              </div>
              <div className={style.header__topBtn}>
                <ThemeButton />
              </div>
              <Link
                to={`../${Pathname.favorites}`}
                className={classNames(style.header__actionsLink, {
                  [style.header__activeButton]: pathname === Pathname.favorites,
                })}
              >
                {favorites.length > 0 && (
                  <span className={style.header__quantityItemsCircle}>
                    {favorites.length}
                  </span>
                )}
                <IconFavorites className={style.header__actionsImg} />
              </Link>
              <Link
                to={`../${Pathname.cart}`}
                className={classNames(style.header__actionsLink, {
                  [style.header__activeButton]: Pathname.cart === pathname,
                })}
              >
                {cartItems.length > 0 && (
                  <span className={style.header__quantityItemsCircle}>
                    {cartItems.length}
                  </span>
                )}
                <LogoCart className={style.header__actionsImg} />
              </Link>
            </div>
          ) : (
            <button
              className={style.header__burgerMenu}
              onClick={() => setActiveMenu(true)}
            >
              <IconBurger className={style.header__burgerMenuImg} />
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};
