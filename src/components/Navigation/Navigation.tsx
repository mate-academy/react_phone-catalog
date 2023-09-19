import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoutes } from 'config';
import { pages } from 'routing';
import './Navigation.scss';

const NAV_LINKS_TO_HIDE = ['*', 'cart', 'favourites', 'productId'];

export const Navigation = () => {
  const navbarItemClass = ({ isActive }: {
    isActive: boolean
  }) => classNames('nav__link', {
    'nav__link--is-active': isActive,
  });

  const renderNavLink = () => {
    return Object.keys(pages).map(link => {
      if (!NAV_LINKS_TO_HIDE.includes(link)) {
        return (
          <NavLink key={link} to={link} className={navbarItemClass}>
            {link}
          </NavLink>
        );
      }

      return null;
    });
  };

  return (
    <nav className="nav">
      <Link
        className="nav__logo"
        to={AppRoutes.HomePage}
      >
        <img
          alt="logo"
          className="check"
          src="img/icons/logo.svg"
        />
      </Link>
      {renderNavLink()}
    </nav>
  );
};
