import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import styles from './MobileMenu.module.scss';
import classNames from 'classnames';

// Правильні шляхи до зображень для Vite
const logo = '/img/Logo.png';
const deleteIcon = '/img/delete.png';
const favouriteIcon = '/img/favourite-icon.png';
const cartIcon = '/img/Shopping-cart.png';

type Props = {
  isOpenMenu: boolean;
  handleCloseMenu: () => void;
};

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/phones', text: 'Phones' },
  { to: '/tablets', text: 'Tablets' },
  { to: '/accessories', text: 'Accessories' },
];

export const MobileMenu: React.FC<Props> = ({
  isOpenMenu,
  handleCloseMenu,
}) => {
  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpenMenu]);

  if (!isOpenMenu) {
    return null;
  }

  const handleNavClick = () => {
    handleCloseMenu();
  };

  return (
    <div className={styles.mobileMenu}>
      <header className={styles.MobileMenu__header}>
        <div className={styles.headerMenu__logo}>
          <img src={logo} alt="Logo" className={styles.headerMenu__logo_pict} />
        </div>
        <div className={styles.headerMenu__button}>
          <button
            className={styles.headerMenu__button_icon}
            onClick={handleCloseMenu}
          >
            <img src={deleteIcon} alt="icon close" className={styles.icon} />
          </button>
        </div>
      </header>

      <div className={styles.MobileMenu__body}>
        <nav className={styles.bodyMenu__nav}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                classNames(styles.bodyMenu__nav_link, {
                  [styles.is_active]: isActive,
                })
              }
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.MobileMenu__user}>
        <NavLink
          to="/favourites"
          onClick={handleNavClick}
          className={({ isActive }) =>
            classNames(styles.MobileMenu__user_icon, styles.icon_favourites, {
              [styles.is_active]: isActive,
            })
          }
        >
          <span
            className="icon-badge-wrapper"
            data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}
          >
            <img
              src={favouriteIcon}
              alt="favourite icon"
              className={styles.icon}
            />
          </span>
        </NavLink>
        <NavLink
          to="/cart"
          onClick={handleNavClick}
          className={({ isActive }) =>
            classNames(styles.MobileMenu__user_icon, {
              [styles.is_active]: isActive,
            })
          }
        >
          <span
            className="icon-badge-wrapper"
            data-count={cartCount !== 0 ? `${cartCount}` : ''}
          >
            <img src={cartIcon} alt="cart icon" className={styles.icon} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};
