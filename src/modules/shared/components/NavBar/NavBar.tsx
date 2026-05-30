import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.scss';

interface NavBarProps {
  variant?: 'horisontal' | 'vertical';
}

const getActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${s.active}  ${s.upperText}` : `${s.upperText}`;

export const NavBar: FC<NavBarProps> = ({ variant = 'horisontal' }) => (
  <nav className={variant === 'vertical' ? s.verticalNav : s.horizontalNav}>
    <ul className={s.mainMenu}>
      <li>
        <NavLink to="/" className={getActive}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/phones" className={getActive}>
          Phones
        </NavLink>
      </li>
      <li>
        <NavLink to="/tablets" className={getActive}>
          Tablets
        </NavLink>
      </li>
      <li>
        <NavLink to="/accessories" className={getActive}>
          Accessories
        </NavLink>
      </li>
    </ul>
  </nav>
);
