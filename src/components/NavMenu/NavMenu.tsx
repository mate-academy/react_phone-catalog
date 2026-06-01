import { NavLink } from 'react-router-dom';
import style from './NavMenu.module.scss';
import { NAV_LINKS } from '../../modules/shared/constants/navLinks';

// const NAV_LINKS = [
//   { to: '/', label: 'Home' },
//   { to: '/phones', label: 'Phones' },
//   { to: '/tablets', label: 'Tablets' },
//   { to: '/accessories', label: 'Accessories' },
// ];

export const NavMenu = () => {
  return (
    <nav className={style.nav}>
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.active}` : style.link
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
