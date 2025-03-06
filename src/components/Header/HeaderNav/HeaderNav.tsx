import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import headerNavStyles from './HeaderNav.module.scss';
import { getLinkActive } from '../../../modules/utils/getLinkActive';
import { CategoriesContext } from '../../../context/СategoriesContext';

export const HeaderNav = () => {
  const categories = useContext(CategoriesContext);

  return (
    <nav className={headerNavStyles.nav}>
      <ul className={headerNavStyles.nav__menu}>
        <li className={headerNavStyles.nav__item}>
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              getLinkActive({
                isActive,
                baseClass: headerNavStyles.nav__link,
              })
            }
          >
            home
          </NavLink>
        </li>
        {categories.map(category => (
          <li className={headerNavStyles.nav__item} key={category}>
            <NavLink
              to={`${category}`}
              className={({ isActive }) =>
                getLinkActive({
                  isActive,
                  baseClass: headerNavStyles.nav__link,
                })
              }
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
