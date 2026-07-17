import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

export type MobileMenuProps = {
  isOpen: boolean;
};

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const NAV_LINKS = [
    { label: 'HOME', to: '/' },
    { label: 'PHONES', to: '/phones' },
    { label: 'TABLETS', to: '/tablets' },
    { label: 'ACCESSORIES', to: '/accessories' },
  ];

  const mobileMenuClassName = classNames(styles.mobileMenu, {
    [styles['mobileMenu--open']]: isOpen,
  });

  return (
    <aside className={mobileMenuClassName}>
      <nav className={styles.mobileMenu__navLinks}>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink key={to} to={to} className={styles.link}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
