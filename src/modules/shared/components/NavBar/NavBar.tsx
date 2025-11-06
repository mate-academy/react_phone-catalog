import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.scss';

const getActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${s.active}  ${s.upperText}` : `${s.upperText}`;

export const NavBar: FC = () => (
  <nav>
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
