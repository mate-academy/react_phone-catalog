import logo from '../../../public/icons/Logo.svg';
import cart from '../../../public/icons/Shopping bag (Cart).svg';
import heart from '../../../public/icons/Favourites (Heart Like).svg';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { scrollToTop } from '../../styles/utils/ScrollTop';
import { useFavorites } from '../../context/FavoritesContext';
import { useAddedToCart } from '../../context/AddedToCartContext';

export const Header = () => {
  const location = useLocation();
  const { addedToCart } = useAddedToCart();
  const { favorites } = useFavorites();
  const quantity: number = addedToCart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const tabChosen = (name: string) => {
    if (location.pathname.startsWith(name)) {
      return `${styles.nav_tab_active} ${styles.nav_tab}`;
    }

    return styles.nav_tab;
  };

  return (
    <nav className={styles.container}>
      <div className={styles.nav_main_block}>
        <Link to={'/'} className={styles.nav_logo} onClick={scrollToTop}>
          <img src={logo} />
        </Link>
        <div className={styles.nav_tabs}>
          <Link
            to={'/'}
            className={
              location.pathname === '/'
                ? `${styles.nav_tab_active} ${styles.nav_tab}`
                : styles.nav_tab
            }
            onClick={scrollToTop}
          >
            home
          </Link>
          <Link
            to={'/phones'}
            className={tabChosen('/phones')}
            onClick={scrollToTop}
          >
            phones
          </Link>
          <Link
            to={'/tablets'}
            className={tabChosen('/tablets')}
            onClick={scrollToTop}
          >
            tablets
          </Link>
          <Link
            to={'/accessories'}
            className={tabChosen('/accessories')}
            onClick={scrollToTop}
          >
            accessories
          </Link>
        </div>
      </div>
      <div className={styles.nav_icon_block}>
        <Link
          to={'/favorites'}
          className={styles.nav_icon}
          onClick={scrollToTop}
        >
          <img src={heart} />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </Link>
        <Link to={'/cart'} className={styles.nav_icon} onClick={scrollToTop}>
          <img src={cart} />
          {quantity > 0 && <span className={styles.badge}>{quantity}</span>}
        </Link>
      </div>
    </nav>
  );
};
