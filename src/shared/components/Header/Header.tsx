import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { getClassLink } from '../../utils/activeClassName';

import LogoIcon from '../../../assets/icons/header-icons/logo-icon.svg';
// eslint-disable-next-line
import FavoritesIcon from '../../../assets/icons/header-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/header-icons/cart-icon.svg';
// eslint-disable-next-line
import HamburgerIcon from '../../../assets/icons/header-icons/hamburger-icon.svg';
import CloseIcon from '../../../assets/icons/aside-icons/aside-close-icon.svg';
import { useAppSelector } from '../../../store/hooks';

type Props = {
  isOpenSide: boolean;
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ isOpenSide, setIsOpenSide }) => {
  const favoritesProduct = useAppSelector(state => state.favorites);
  const cartsProduct = useAppSelector(state => state.cart);

  const totalItems =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logoLink}>
          <img src={LogoIcon} alt="Логотип" className={styles.header__logo} />
        </Link>

        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__wrapper}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              getClassLink({
                isActive,
                baseClass: styles.header__favoritesLink,
                activeClass: styles.header__imageLinkActive,
              })
            }
          >
            <img
              src={FavoritesIcon}
              alt="Відкрити улюблені товари"
              className={styles.header__favoritesImg}
            />
            {favoritesProduct.length > 0 && (
              <span className={styles.header__cartBadge}>
                {favoritesProduct.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              getClassLink({
                isActive,
                baseClass: styles.header__cartLink,
                activeClass: styles.header__imageLinkActive,
              })
            }
          >
            <img
              src={CartIcon}
              alt="Відкрити корзину"
              className={styles.header__cartImg}
            />
            {totalItems && (
              <span className={styles.header__cartBadge}>{totalItems}</span>
            )}
          </NavLink>
          <button
            className={getClassLink({
              isActive: isOpenSide,
              baseClass: styles.header__menuLink,
              activeClass: styles.header__imageLinkActive,
            })}
            aria-label="Відкрити меню"
            onClick={() => setIsOpenSide(prev => !prev)}
          >
            <img
              src={!isOpenSide ? HamburgerIcon : CloseIcon}
              alt={!isOpenSide ? 'Відкрити меню' : 'Закрити меню'}
              className={styles.header__menuImg}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
