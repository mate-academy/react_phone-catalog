import classNames from 'classnames';
import s from './NavList.module.scss';
import { NavLink } from 'react-router-dom';

type NavListProps = {
  variant?: 'topbar' | 'burger';
};

export const NavList = ({ variant = 'topbar' }: NavListProps) => {
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Phones', to: '/phones' },
    { label: 'Tablets', to: '/tablets' },
    { label: 'Accessories', to: '/accessories' },
  ];

  return (
    <ul className={classNames(s.navList, s[variant])}>
      {navLinks.map(link => (
        <li key={link.to} className={s.navItem}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              classNames(s.navLink, { [s.isActive]: isActive })
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
