import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import { useContext } from 'react';
import { MenuOpen } from '../../utils/MenuContext';

export const Menu = () => {
  const { setIsMenuOpen } = useContext(MenuOpen);

  return (
    <aside id="menu" className="menu">
      <nav className="menu__nav">
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/phones"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/tablets"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Tablets
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/accessories"
              className={({ isActive }: { isActive: boolean }) =>
                classNames('menu__link', {
                  'is-active-link': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="menu__footer">
        <NavLink
          to="/favorites"
          className="menu__footer-link"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/img/heart-icon.svg" alt="favorites" />
        </NavLink>
        <NavLink
          to="/basket"
          className="menu__footer-link"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/img/basket-icon.svg" alt="basket" />
        </NavLink>
      </div>
    </aside>
  );
};
