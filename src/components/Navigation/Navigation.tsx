import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { pages } from '../../Root';
import './Navigation.scss';
import { NavIcon } from '../NavIcon';

export const Navigation = () => {
  const navbarItemClass = ({ isActive }: {
    isActive: boolean
  }) => classNames('nav__link', {
    'nav__link--is-active': isActive,
  });

  return (
    <nav className="nav">
      <div className="nav__leftside">
        <Link
          className="nav__logo"
          to="/"
        >
          <img
            alt="logo"
            className="check"
            src="/img/icons/logo.svg"
          />
        </Link>

        {Object.keys(pages).map(link => {
          return link === '*' || link === 'cart' || link === 'favourites'
            ? null
            : (
              <NavLink
                to={link}
                className={navbarItemClass}
              >
                {link}
              </NavLink>
            );
        })}
      </div>

      <div className="nav__rigthside">
        <NavIcon
          path="favourites"
          alt="like-icon"
          src="/img/icons/like.svg"
        />

        <NavIcon
          path="cart"
          alt="cart-icon"
          src="/img/icons/cart.svg"
        />
      </div>
    </nav>
  );
};
