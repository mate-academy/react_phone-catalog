import React, { useEffect } from 'react';
import { useIconLinks } from '../../hooks/useIconLinks';
import styles from './BurgerMenu.module.scss';
import { navItems } from '../../constants/navItems';
import { NavLink } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ onClose }) => {
  const iconLinks = useIconLinks();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.burgerMenu}>
      <nav className={styles.burgerMenu__nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? `${styles.burgerMenu__link} ${styles.burgerMenu__linkActive}`
                : styles.burgerMenu__link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.burgerMenu__actions}>
        {iconLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? `${styles.burgerMenu__action} ${styles.burgerMenu__actionActive}`
                : styles.burgerMenu__action
            }
          >
            <span className={styles.burgerMenu__iconWrap}>
              <img
                src={link.icon}
                alt={link.label}
                className={styles.burgerMenu__icon}
              />
              {link.count > 0 && (
                <span className={styles.burgerMenu__count}>{link.count}</span>
              )}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
