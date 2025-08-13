import { NavLink } from 'react-router-dom';
import scss from './Menu.module.scss';
import classNames from 'classnames';

export const Menu = () => {
  return (
    <nav className={scss.menu}>
      <ul className={scss.menu__list}>
        <li className={scss.menu__item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${scss.menu__link} ${scss.menu__link_active}`
                : scss.menu__link
            }
          >
            Home
          </NavLink>
        </li>
        <li className={scss.menu__item}>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${scss.menu__link} ${scss.menu__link_active}`
                : scss.menu__link
            }
          >
            Phones
          </NavLink>
        </li>
        <li className={scss.menu__item}>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive
                ? `${scss.menu__link} ${scss.menu__link_active}`
                : scss.menu__link
            }
          >
            Tablets
          </NavLink>
        </li>
        <li className={scss.menu__item}>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? `${scss.menu__link} ${scss.menu__link_active}`
                : scss.menu__link
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <ul className={scss.menu__iconsWrapper}>
        <li className={scss.menu__iconLink}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(scss.menu__iconLink, {
                [scss.menu__iconLink_active]: isActive,
              })
            }
            aria-label="Favourites"
          >
            <svg className={scss.menu__icon}>
              <use href="/icons/icons.svg#heart-icon"></use>
            </svg>
          </NavLink>
        </li>
        <li className={scss.menu__iconLink}>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(scss.menu__iconLink, {
                [scss.menu__iconLink_active]: isActive,
              })
            }
            aria-label="Shopping Bag"
          >
            <svg className={scss.menu__icon}>
              <use href="/icons/icons.svg#shopping-bag"></use>
            </svg>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
