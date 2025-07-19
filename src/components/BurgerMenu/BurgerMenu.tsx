import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import closeMenuIcon from '../../assets/icons/close.svg';
import heart from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart.svg';
import Logo from '../../assets/icons/Logo.svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  closeMenu: () => void;
  menuLinks: { to: string; label: string }[];
  isMenuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({
  closeMenu,
  menuLinks,
  isMenuOpen,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);

      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={classNames(styles.menu, {
        [styles.open]: isMenuOpen,
      })}
    >
      <div className={styles.menu__top}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <button onClick={closeMenu} className={styles.closeButton}>
          <img
            src={closeMenuIcon}
            className={styles.menu__icon}
            alt="Close menu"
          />
        </button>
      </div>

      <ul className={styles.menu__list}>
        {menuLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.menu__footer}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames(styles.menu__footer_link, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          <img src={heart} className={styles.menu__icon} alt="Favourites" />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.menu__footer_link, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          <img src={cart} className={styles.menu__icon} alt="Cart" />
        </NavLink>
      </div>
    </div>
  );
};
