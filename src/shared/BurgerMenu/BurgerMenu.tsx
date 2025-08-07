import { Link, useLocation } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { NavBar } from '../NavBar';

export const BurgerMenu: React.FC = () => {
  const location = useLocation();
  const { setIsMenuOpen } = useMyContext();
  const links = [
    { path: '/', title: 'Home' },
    { path: '/phones', title: 'phones' },
    { path: '/tablets', title: 'tablets' },
    { path: '/accessories', title: 'accessories' },
  ];

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
            <img
              src="img/Additional images/icons/white_heart.svg"
              alt="heart"
            />
          </Link>
          <Link
            to={'/cart'}
            className={`${styles.BurgerMenu_button} ${styles.BurgerMenu_cart}`}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <img src="img/Additional images/icons/white cart.svg" alt="cart" />
          </Link>
        </div>
      </div>
    </div>
  );
};
