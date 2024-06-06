import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/button.scss';
import './Header.scss';
import '../../styles/nav.scss';
import '../../styles/is-active.scss';

interface Options {
  isActive: boolean;
}

const getLinkClass = ({ isActive }: Options) =>
  cn('nav__item header__nav__item', {
    'is-active': isActive,
  });

const getLinkIconClass = ({ isActive }: Options) =>
  cn('header__button', 'button', {
    'is-active': isActive,
  });

const getNavLinkPath = (option: string) => {
  return option === 'home' ? '/' : `/${option}`;
};

export const Header = () => {
  const options = ['home', 'phones', 'tablets', 'accessories'];

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
          to="/?aside=open"
          className="header__burger-menu header__button button"
        >
          <img src="icons/Menu.svg" alt="cart" />
        </NavLink>

        <div className="header__right">
          <NavLink to="/favourites" className={getLinkIconClass}>
            <img src="icons/Favourites.svg" alt="favourites" />
          </NavLink>

          <NavLink to="/cart" className={getLinkIconClass}>
            <img src="icons/Cart.svg" alt="cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
