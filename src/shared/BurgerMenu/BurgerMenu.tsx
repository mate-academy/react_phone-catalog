import { Link, useLocation } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { NavBar } from '../NavBar';
import { useEffect, useState } from 'react';

export const BurgerMenu: React.FC = () => {
  const location = useLocation();
  const { setIsMenuOpen, products } = useMyContext();
  const [favoriteNumber, setFavoriteNumber] = useState<number>(0);
  const [cartNumber, setCartNumber] = useState<number>(0);
  const links = [
    { path: '/', title: 'Home' },
    { path: '/phones', title: 'phones' },
    { path: '/tablets', title: 'tablets' },
    { path: '/accessories', title: 'accessories' },
  ];

  useEffect(() => {
    products.forEach(product => {
      const jsonFavorite = localStorage.getItem(product.itemId);

      if (jsonFavorite) {
        setFavoriteNumber(prev => prev + 1);
      }

      const jsonOrder = localStorage.getItem(`cart_${product.itemId}`);

      if (jsonOrder) {
        setCartNumber(prev => prev + 1);
      }
    });
  }, []);

  return (
    <div className={styles.BurgerMenu}>
      <NavBar />
      <div className={styles.BurgerMenu_content}>
        <div className={styles.BurgerMenu_pages}>
          {links.map(link => (
            <Link
              key={link.title}
              to={link.path}
              className={`${styles.BurgerMenu_link} ${
                location.pathname === link.path ? styles.isActive : ''
              }`}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className={styles.BurgerMenu_savedGoods}>
          <Link
            to={'/favorites'}
            className={`${styles.BurgerMenu_button} ${styles.BurgerMenu_favorite}`}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <div className={styles.heart_container}>
              <img
                className={styles.heart_image}
                src="img/Additional images/icons/white_heart.svg"
                alt="heart"
              />
              <span className={styles.heart_badge}>{favoriteNumber}</span>
            </div>
          </Link>
          <Link
            to={'/cart'}
            className={`${styles.BurgerMenu_button} ${styles.BurgerMenu_cart}`}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <div className={styles.cart_container}>
              <img
                className={styles.cart_image}
                src="img/Additional images/icons/Shopping cart.svg"
                alt="cart"
              />
              <span className={styles.cart_badge}>{cartNumber}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
