import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useProducts } from '../../shared/context/ProductsContext';
import { BurgerMenu } from './BurgerMenu';
import { IconItem } from './IconItem';

import Favorites from '../../assets/icons/header_icons/Favourites.svg';
import ShoppingBag from '../../assets/icons/header_icons/ShoppingBag.svg';
import BurgerIcon from '../../assets/icons/header_icons/burger.svg';
import Logo from '../../assets/images/Logo.svg';
import styles from './Header.module.scss';

export const Header = () => {
  const { favorites, cartItems } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const pages = ['home', 'phones', 'tablets', 'accessories'];
  const [favoriteCount, setFavoriteCount] = useState<number>(favorites.length);
  const [cartCount, setCartCount] = useState<number>(cartItems.length);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleBurgerToggle = () => setIsOpen(prev => !prev);

  useEffect(() => {
    setFavoriteCount(favorites.length);
    setCartCount(cartItemCount);
  }, [favorites.length, cartItemCount]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <div className={styles.container}>
        <nav className={styles.header__nav}>
          {pages.map(link => (
            <NavLink
              key={link}
              to={link === 'home' ? '/' : `/${link}`}
              className={({ isActive }) =>
                `${styles.nav__item} ${isActive ? styles.active : ''}`
              }
            >
              {link}
            </NavLink>
          ))}
        </nav>

        <div className={styles.buttons}>
          <Link to="/favorites" className={styles.header__button}>
            <IconItem
              count={favoriteCount}
              img={Favorites}
              imgSubtitle="Favorites"
            />
          </Link>
          <Link to="/cart" className={styles.header__button}>
            <IconItem
              count={cartCount}
              img={ShoppingBag}
              imgSubtitle="Shopping Bag"
            />
          </Link>
        </div>

        <button className={styles.burgerBtn} onClick={handleBurgerToggle}>
          <img src={BurgerIcon} alt="Menu" />
        </button>
      </div>

      {isOpen && (
        <BurgerMenu
          onClose={handleBurgerToggle}
          favoritesCount={favoriteCount}
          cartItemsCount={cartCount}
        />
      )}
    </header>
  );
};
