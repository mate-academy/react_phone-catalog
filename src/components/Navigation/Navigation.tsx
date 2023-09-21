import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { pages } from 'routing';
import { Logo } from 'components/Logo';
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
          <NavLink
            key={link}
            to={link}
            className={navbarItemClass}
          >
            {link}
          </NavLink>
        );
      }

      return null;
    });
  };

  const navigationLinks = renderNavLink();

  return (
    <nav className="nav">
      <div className="nav__logo">
        <Logo />
      </div>
      {navigationLinks}
    </nav>
  );
};
