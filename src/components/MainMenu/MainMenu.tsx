import styles from './MainMenu.module.scss';
import Logo from '../Logo/index';

import Menu from '../Menu/index';
import FavouritesLink from '../FavouritesLink';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';

type Props = {
  isMenuOpen: boolean;
  onClose: () => void;
  handleMenuClick: () => void;
};

export const MainMenu: React.FC<Props> = ({
  isMenuOpen,
  onClose,
  handleMenuClick,
}) => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();

  return (
    <aside
      className={`${styles.mainMenu} ${isMenuOpen ? styles.open : ''}`}
      id="main-menu"
      aria-hidden={!isMenuOpen}
    >
      <div className={styles.mainMenu__layout}>
        <div className={styles.mainMenu__content}>
          <div className={`${styles.topBar} ${styles.mainMenu__top}`}>
            <Logo handleMenuClick={handleMenuClick} />
            <div className={styles.topBar__icons}>
              <div className={styles.icon__background}>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className={`${styles.icon} ${styles['icon--close']}`}
                ></button>
              </div>
            </div>
          </div>

          <div className={styles.mainMenu__bottom}>
            <Menu
              className={styles.mainMenu__nav}
              handleMenuClick={handleMenuClick}
            />
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footer__col}>
            <div className={styles.iconWrap}>
              <FavouritesLink
                to="/favorites"
                className={`${styles.icon} ${styles.header__favIcon}`}
                handleMenuClick={handleMenuClick}
              />
              {favorites.length > 0 && (
                <span
                  className={`${styles.badge} ${styles['favorites-badge']}`}
                >
                  {favorites.length}
                </span>
              )}
            </div>
          </div>
          <div className={styles.footer__col}>
            <div className={styles.iconWrap}>
              <Link
                to="/cart"
                className={`${styles.icon} ${styles['icon--shopping-bag-cart']}`}
                onClick={handleMenuClick}
              ></Link>
              {totalQuantity > 0 && (
                <span className={`${styles.badge} ${styles['cart-badge']}`}>
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </footer>
      </div>
    </aside>
  );
};
