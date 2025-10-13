import styles from './NavLinks.module.scss';
import { NavLink, useParams } from 'react-router-dom';

export const NavLinks = () => {
  const { category } = useParams();

  const navLinks = [
    { to: '/', label: 'home' },
    { to: '/phones', label: 'phones' },
    { to: '/tablets', label: 'tablets' },
    { to: '/accessories', label: 'accessories' },
  ];

  return (
    <nav className={styles.nav}>
      {navLinks.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            category === link.to || isActive ? styles.active : ''
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
