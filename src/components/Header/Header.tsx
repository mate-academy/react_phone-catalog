import styles from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import '../../../public/img/Favourites (Heart Like).svg';
import '../../../public/img/Shopping bag (Cart).svg';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import { SearchInput } from './components/SearchInput/SearchInput';
export const Header = ({ onBurgerToggle }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const showSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';
  const [Active, setIsActive] = useState<boolean>(false);
  const { items } = useContext(CartContext);
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const favourites = useFavourites();
  const favouritesCount = favourites.favourites.length;
  const [isOpen, setIsOpen] = useState(false);
  const toggleBurger = () => {
    setIsOpen(!isOpen);
    onBurgerToggle(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src="./img/Logo.svg" alt="Nice Gadgets" />
      </div>

      <motion.button
        className={styles.header__burger}
        onClick={() => toggleBurger()}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { rotate: 90 },
          closed: 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={
            isOpen
              ? './img/buttons/Icons/Icons/Icons/Close.svg'
              : './img/buttons/Icons/Icons/Menu.svg'
          }
          alt="burger-menu"
        />
      </motion.button>

      <nav className={styles.header__nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(styles.header__link, {
              [styles['header__link--active']]: isActive,
            })
          }
        >
          {t('header.home')}
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            classNames(styles.header__link, {
              [styles['header__link--active']]: isActive,
            })
          }
        >
          {t('header.phones')}
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            classNames(styles.header__link, {
              [styles['header__link--active']]: isActive,
            })
          }
        >
          {t('header.tablets')}
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            classNames(styles.header__link, {
              [styles['header__link--active']]: isActive,
            })
          }
        >
          {t('header.accessories')}
        </NavLink>
      </nav>
      <div className={styles.header__buttons}>
        {showSearch && <SearchInput active={Active} />}
        {showSearch && (
          <button
            className={styles.header__search}
            onClick={() => setIsActive(!Active)}
          >
            <img src="./img/Icons/Search.svg" alt="search" />
          </button>
        )}
        <LanguageSwitcher />
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames(styles.header__icon, styles.header__link, {
              [styles['header__link--active']]: isActive,
            })
          }
        >
          <div className={styles.header__favouritesWrapper}>
            <img
              src="./img/Favourites (Heart Like).svg"
              alt="favourites"
              className={styles.header__favouritesIcon}
            />
            {favouritesCount > 0 && (
              <span className={styles.header__favouritesBadge}>
                {favouritesCount}
              </span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.header__icon, styles.header__link, {
              [styles['header__link--active']]: isActive,
            })
          }
        >
          <div className={styles.header__cartWrapper}>
            <img
              src="./img/Shopping bag (Cart).svg"
              alt="cart"
              className={styles.header__cartIcon}
            />
            {cartCount > 0 && (
              <span className={styles.header__cartBadge}>{cartCount}</span>
            )}
          </div>
        </NavLink>
      </div>

      <div
        className={classNames(styles.mobileMenu, {
          [styles['mobileMenu--open']]: isOpen,
        })}
      >
        <nav className={styles.mobileMenu__nav}>
          <LanguageSwitcher />

          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles.mobileMenu__link, styles.header__link, {
                [styles['mobileMenu__link--active']]: isActive,
              })
            }
            onClick={() => setIsOpen(false)}
          >
            {t('header.home')}
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles.mobileMenu__link, styles.header__link, {
                [styles['mobileMenu__link--active']]: isActive,
              })
            }
            onClick={() => setIsOpen(false)}
          >
            {t('header.phones')}
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles.mobileMenu__link, styles.header__link, {
                [styles['mobileMenu__link--active']]: isActive,
              })
            }
            onClick={() => setIsOpen(false)}
          >
            {t('header.tablets')}
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(styles.mobileMenu__link, styles.header__link, {
                [styles['mobileMenu__link--active']]: isActive,
              })
            }
            onClick={() => setIsOpen(false)}
          >
            {t('header.accessories')}
          </NavLink>
        </nav>
        <div className={styles.mobileMenu__buttons}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(styles.header__icon, styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
          >
            <img src="./img/Favourites (Heart Like).svg" alt="favourites" />
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.header__icon, styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
          >
            <img src="./img/Shopping bag (Cart).svg" alt="cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
