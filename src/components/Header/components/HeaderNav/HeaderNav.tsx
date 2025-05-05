import React, { memo, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import headerNavStyles from './HeaderNav.module.scss';
import { getLinkActive } from '../../../../utils/getLinkActive';
import { CategoriesContext } from '../../../../context/CategoriesContext';

type Props = {
  onClose?: () => void;
};

export const HeaderNav: React.FC<Props> = memo(({ onClose = () => {} }) => {
  const { categories } = useContext(CategoriesContext);

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
            onClick={() => onClose()}
          >
            home
          </NavLink>
        </li>
        {categories.map(category => (
          <li className={headerNavStyles.nav__item} key={category.name}>
            <NavLink
              to={`${category.name}`}
              className={({ isActive }) =>
                getLinkActive({
                  isActive,
                  baseClass: headerNavStyles.nav__link,
                })
              }
              onClick={() => onClose()}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});

HeaderNav.displayName = 'HeaderNav';
