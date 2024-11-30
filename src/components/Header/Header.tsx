import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import icons from '../../assets/icons/icons.svg';
import logo from '../../assets/images/Logo-phone-version.svg';
import styles from './Header.module.scss';
import { MobileMenu } from '../MobileMenu';
import { ProductsContext } from '../../store/ProductsContext';
import CartIcon from '../Counter/Counter';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.headerNavLink} ${styles.active}` : styles.headerNavLink;

const getNavLinkFav = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.headerFavouriteBtn} ${styles.active}`
    : styles.headerFavouriteBtn;

const getNavLinkCart = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.headerCartIcon} ${styles.active}`
    : styles.headerCartIcon;

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, favorites } = useContext(ProductsContext);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLogoWrap}>
          <Link className={styles.logoHeader} to="/">
            <img src={logo} alt="LogoHeader" />
          </Link>
        </div>

        <nav className={styles.headerNav}>
          <NavLink to="/" className={getNavLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavLinkClassName}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClassName}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClassName}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.HeaderMenuWrapper}>
          {!isOpen ? (
            <div className={styles.headerMenuIcon} onClick={handleToggleMenu}>
              <svg className={styles.icon}>
                <use href={`${icons}#icon-burger-menu`}></use>
              </svg>
            </div>
          ) : (
            <div className={styles.headerCloseIcon} onClick={handleToggleMenu}>
              <svg className={styles.icon}>
                <use href={`${icons}#icon-close-menu`}></use>
              </svg>
            </div>
          )}

          <NavLink to="/catalog" className={getNavLinkFav}>
            <svg className={styles.icon}>
              <use href={`${icons}#header-icon-header`}></use>
            </svg>
            <CartIcon itemCount={favoritesCount} />
          </NavLink>

          <NavLink to="/cart" className={getNavLinkCart}>
            <svg className={styles.icon}>
              <use href={`${icons}#shopping-bag-icon`}></use>
            </svg>
            <CartIcon itemCount={itemCount} />
          </NavLink>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={handleToggleMenu} />
    </>
  );
};
