import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navigation.scss';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('header__link', { 'is-active': isActive });

export const NavItems = () => {
  const { menuOpened, onMenuOpened } = useContext(ProductContext);

  const handleNavClick = () => {
    onMenuOpened(!menuOpened);
  };

  return (
    <nav className="navigation">
      <ul
        className={classNames('navigation__items', {
          'navigation__item--opened': menuOpened,
        })}
      >
        <li className="navigation__item">
          <NavLink to="/" className={getActiveLink} onClick={handleNavClick}>
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/phones"
            className={getActiveLink}
            onClick={handleNavClick}
          >
            Phones
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/tablets"
            className={getActiveLink}
            onClick={handleNavClick}
          >
            Tablets
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/accessories"
            className={getActiveLink}
            onClick={handleNavClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
