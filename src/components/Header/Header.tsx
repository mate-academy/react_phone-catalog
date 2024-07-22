import cn from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../../styles/button.scss';
import './Header.scss';
import '../../styles/nav.scss';
import '../../styles/is-active.scss';
import { useAppSelector } from '../../app/hooks';

interface Options {
  isActive: boolean;
}

const getLinkClass = ({ isActive }: Options) =>
  cn('nav__item header__nav__item', {
    'is-active': isActive,
  });

const getLinkIconClass = ({ isActive }: Options) =>
  cn('header__button', 'button', {
    'header__button--is-active': isActive,
  });

const getNavLinkPath = (option: string) => {
  return option === 'home' ? '/' : `/${option}`;
};

export const Header = () => {
  const options = ['home', 'phones', 'tablets', 'accessories'];
  const cartProducts: number = useAppSelector(state => state.cart.items).length;
  const favouriteProducts: number = useAppSelector(
    state => state.favourite.items,
  ).length;

  const location = useLocation();
  const currentPath = location.pathname + location.search;

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="logo-wrapper">
          <img src="icons/Logo.svg" alt="Logo" className="header__logo logo " />
        </Link>

        <nav className="nav header__nav">
          {options.map(option => (
            <NavLink
              key={option}
              to={getNavLinkPath(option)}
              className={getLinkClass}
            >
              {option}
            </NavLink>
          ))}
        </nav>

        <div className="search header__search" />

        <NavLink
          to={`${currentPath}?aside=open`}
          className="header__burger-menu header__button button"
        >
          <img src="icons/Menu.svg" alt="cart" />
        </NavLink>

        <div className="header__right">
          <NavLink
            to="/favourites"
            className={cn(
              getLinkIconClass,
              'header__button header__button--favourites',
            )}
          >
            {favouriteProducts > 0 && (
              <div className="header__button__icon">{favouriteProducts}</div>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={cn(
              getLinkIconClass,
              'header__button header__button--cart',
            )}
          >
            {cartProducts > 0 && (
              <div className="header__button__icon">{cartProducts}</div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
