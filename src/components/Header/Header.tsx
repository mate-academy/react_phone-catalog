import styles from './Header.module.scss';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg?react';
import FiShoppingBag from '../../assets/icons/bag.svg?react';
import FiMenu from '../../assets/icons/menu.svg?react';
import CloseIcon from '../../assets/icons/сlose.svg?react';
import { Logo } from '../../assets/images/index';
import { useCart } from '../../shared/context/CartContext';
import { useFavorites } from '../../shared/context/Favorites';

interface HeaderLinks {
  name: string;
  linkTo: string;
}

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalQuantity } = useCart();
  const { favoritesItems } = useFavorites();

  const LINKS: HeaderLinks[] = [
    {
      name: 'HOME',
      linkTo: '/',
    },
    {
      name: 'PHONES',
      linkTo: 'products/phones',
    },
    {
      name: 'TABLETS',
      linkTo: 'products/tablets',
    },
    {
      name: 'ACCESSORIES',
      linkTo: 'products/accessories',
    },
  ];

  useEffect(() => {
    document.body.style.overflowX = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  function favoritesAmmount(): number {
    return favoritesItems.length;
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="nice gadgets" />
      </div>
      <button
        className={styles.burger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <CloseIcon /> : <FiMenu />}
      </button>
      <div className={styles.header__nav}>
        <ul className={styles.header__links}>
          {LINKS.map((el: HeaderLinks) => {
            return (
              <NavLink
                key={el.name}
                to={el.linkTo}
                className={({ isActive }) =>
                  isActive ? styles.link_active : ''
                }
              >
                {el.name}
              </NavLink>
            );
          })}
        </ul>
      </div>
      <div className={styles.header__icons}>
        <NavLink to="/favorites" className={styles.icon}>
          <div>
            {favoritesAmmount() !== 0 && (
              <div className={styles.amount}>{favoritesAmmount()}</div>
            )}

            <HeartIcon />
          </div>
        </NavLink>
        <NavLink to="/cart" className={styles.icon}>
          <div>
            {getTotalQuantity() !== 0 && (
              <div className={styles.amount}>{getTotalQuantity()}</div>
            )}

            <FiShoppingBag />
          </div>
        </NavLink>
      </div>

      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.menuOpen : ''}`}
      >
        <ul>
          {LINKS.map(el => (
            <NavLink
              key={el.name}
              to={el.linkTo}
              className={({ isActive }) => (isActive ? styles.link_active : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              {el.name}
            </NavLink>
          ))}
        </ul>

        <div className={styles.mobileIcons}>
          <NavLink to="/favorites" className={styles.icon}>
            <div style={{ position: 'absolute' }}>
              <div className={styles.amount}>
                {favoritesAmmount() !== 0 && <>{favoritesAmmount()}</>}
              </div>
              <HeartIcon />
            </div>
          </NavLink>
          <NavLink to="/cart" className={styles.icon}>
            <div style={{ position: 'absolute' }}>
              <div className={styles.amount}>
                {getTotalQuantity() !== 0 && <>{getTotalQuantity()}</>}
              </div>
              <FiShoppingBag />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
