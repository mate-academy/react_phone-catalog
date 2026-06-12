import { useContext } from 'react';
import styles from './MobileMenu.module.scss';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';
type Props = {
  onClose: () => void;
};
export const MobileMenu: React.FC<Props> = ({ onClose }) => {
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);


  if (!cartContext) {
    return null;
  }

  const { cart } = cartContext;
  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);

  if (!favoritesContext) {
    return null;
  }

  const { favorites } = favoritesContext;

  return (
    <div className={styles['mobile-menu']}>
      <div className={styles['mobile-menu__top']}>
        <a href="#" className={styles.header__logo}>
          <img src={`${import.meta.env.BASE_URL}/img/icons/logo.svg`}></img>
        </a>
        <button
          onClick={onClose}
          className={`${styles.icon} ${styles['icon--close']} `}
        >
          <img src={`${import.meta.env.BASE_URL}/img/icons/close.svg`} />
        </button>
      </div>

      <nav className={`${styles.header__nav}`}>
        <ul className={styles.nav__list}>
          <li className="nav__item">
            <Link to="/" className={styles.nav__link} onClick={onClose}>
              home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/phones" className={styles.nav__link} onClick={onClose}>
              phones
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/tablets" className={styles.nav__link} onClick={onClose}>
              tablets
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/accessories" className={styles.nav__link} onClick={onClose}>
              accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles['mobile-menu__bottom']}>
        <Link to="/favorites" className={styles.icon} onClick={onClose}>
          <img src={`${import.meta.env.BASE_URL}/img/icons/heart.svg`} />
          {favorites.length > 0 && (
            <span className={styles['favourites-count']}>
              {favorites.length}
            </span>
          )}
        </Link>

        <Link to="/cart" className={styles.icon} onClick={onClose}>
          <img src={`${import.meta.env.BASE_URL}/img/icons/cart.svg`} />
          {cart.length > 0 && (
            <span className={styles['cart-count']}>{totalAmount}</span>
          )}
        </Link>
      </div>
    </div>
  );
};
