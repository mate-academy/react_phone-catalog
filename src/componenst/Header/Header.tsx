import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { favourites } = useFavourites();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__inner}`}>
        <Link to="/" className={styles.header__logo}>
          Gadget Catalog
        </Link>
        <nav className={styles.header__nav}>
          <Link to="/">Home</Link>
          <Link to="/products/phones">Phones</Link>
          <Link to="/products/tablets">Tablets</Link>
          <Link to="/products/accessories">Accessories</Link>
          <Link to="/favourites">
            Favourites {favourites.length > 0 && `(${favourites.length})`}
          </Link>
          <Link to="/cart">Cart {cart.length > 0 && `(${cart.length})`}</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
