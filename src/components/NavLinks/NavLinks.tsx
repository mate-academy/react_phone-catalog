import styles from './NavLinks.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

interface NavLinksProps {
  onClose?: () => void;
}
export const NavLinks: React.FC<NavLinksProps> = ({ onClose }) => {
  const location = useLocation();

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
          onClick={onClose}
          className={location.pathname === link.to ? styles.active : ''}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
