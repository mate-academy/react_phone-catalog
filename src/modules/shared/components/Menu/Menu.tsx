import { NavLink } from 'react-router-dom';
import menuStyles from './Menu.module.scss';

export const Menu = () => {
  return (
    <ul className={menuStyles.menu__list}>
      <li className={menuStyles.menu__item}>
        <NavLink to="/" className={menuStyles.menu__link}>
          Home
        </NavLink>
      </li>
      <li className={menuStyles.menu__item}>
        <NavLink to="phones" className={menuStyles.menu__link}>
          Phones
        </NavLink>
      </li>
      <li className={menuStyles.menu__item}>
        <NavLink to="tablets" className={menuStyles.menu__link}>
          Tablets
        </NavLink>
      </li>
      <li className={menuStyles.menu__item}>
        <NavLink to="accessories" className={menuStyles.menu__link}>
          Accessories
        </NavLink>
      </li>
    </ul>
  );
};
