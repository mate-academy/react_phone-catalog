import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => (
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
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
    <div className="menu__footer">
      <a href="#favorites" className="menu__footer-link">
        <img src="/img/heart-icon.svg" alt="favorites" />
      </a>
      <a href="#basket" className="menu__footer-link">
        <img src="/img/basket-icon.svg" alt="basket" />
      </a>
    </div>
  </aside>
);
