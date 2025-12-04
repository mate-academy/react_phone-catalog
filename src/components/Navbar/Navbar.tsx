import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Search } from '../Search';
import style from './Navbar.module.scss';

const getClass = ({ isActive }: { isActive: boolean }) =>
  classNames(style['navbar-item'], { [style['is-active']]: isActive });

export const Navbar = () => (
  <div className={style.nav__wrapper}>
    <nav className={style.navbar}>
      <NavLink className={getClass} to="/">
        Home
      </NavLink>
      <NavLink className={getClass} to="/phones">
        Phones
      </NavLink>
      <NavLink className={getClass} to="/tablets">
        Tablets
      </NavLink>
      <NavLink className={getClass} to="/accessories">
        Accessories
      </NavLink>
    </nav>

    <div className="nav__search">{false && <Search />}</div>
  </div>
);
