import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import headerNavStyles from './HeaderNav.module.scss';
import { getLinkActive } from '../../../../utils/getLinkActive';
import { ProductsContext } from '../../../../context/ProductsContext';

type Props = {
  onClose?: () => void;
};

export const HeaderNav: React.FC<Props> = ({ onClose = () => {} }) => {
  const { categories } = useContext(ProductsContext);

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
          <li className={headerNavStyles.nav__item} key={category}>
            <NavLink
              to={`${category}`}
              className={({ isActive }) =>
                getLinkActive({
                  isActive,
                  baseClass: headerNavStyles.nav__link,
                })
              }
              onClick={() => onClose()}
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
