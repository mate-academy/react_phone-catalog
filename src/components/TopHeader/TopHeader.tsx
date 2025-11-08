import styles from './TopHeader.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
const logoSvg = `${import.meta.env.BASE_URL}img/site/Nice Gadgets.svg`;
const handOkSvg = `${import.meta.env.BASE_URL}img/site/hand-ok.svg`;
const heartFavoriteSvg = `${import.meta.env.BASE_URL}img/site/heart.svg`;
const cartSvg = `${import.meta.env.BASE_URL}img/site/bag-cart.svg`;
const burgerSvg = `${import.meta.env.BASE_URL}img/site/burger.svg`;
const closeSvg = `${import.meta.env.BASE_URL}img/site/close.svg`;

interface TopHeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export default function TopHeader({
  isMenuOpen,
  onMenuToggle,
}: TopHeaderProps) {
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  return (
    <header className={styles.topHeader}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="Nice Gadgets" />
        <img className={styles.logoHandOk} src={handOkSvg} alt="Hand OK icon" />
      </div>

      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${location.pathname === '/' ? styles.menuItemActive : ''}`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`${styles.menuItem} ${location.pathname.startsWith('/phones') ? styles.menuItemActive : ''}`}
        >
          <Link to="/phones">Phones</Link>
        </li>
        <li
          className={`${styles.menuItem} ${location.pathname.startsWith('/tablets') ? styles.menuItemActive : ''}`}
        >
          <Link to="/tablets">Tablets</Link>
        </li>
        <li
          className={`${styles.menuItem} ${location.pathname.startsWith('/accessories') ? styles.menuItemActive : ''}`}
        >
          <Link to="/accessories">Accessories</Link>
        </li>
        <li
          className={`${styles.menuItem} ${location.pathname.startsWith('/search') ? styles.menuItemActive : ''}`}
        >
          <Link to="/search" className={styles.searchLink}>
            Search
            <IoSearchOutline />
          </Link>
        </li>
      </ul>

      <div className={styles.icons}>
        <Link to="/favorites">
          <div className={styles.iconsFavoriteContainer}>
            <img
              className={styles.iconsFavorite}
              src={heartFavoriteSvg}
              alt="Favorite icon"
            />
            {totalFavorites > 0 && (
              <span className={styles.iconsFavoriteCount}>
                {totalFavorites}
              </span>
            )}
          </div>
        </Link>

        <Link to="/cart">
          <div className={styles.iconsCartContainer}>
            <img
              className={styles.iconsCart}
              src={cartSvg}
              alt="Bag Cart icon"
            />
            {totalItems > 0 && (
              <span className={styles.iconsCartCount}>{totalItems}</span>
            )}
          </div>
        </Link>

        <div className={styles.iconsBurgerContainer} onClick={onMenuToggle}>
          <img
            className={styles.iconsBurger}
            src={isMenuOpen ? closeSvg : burgerSvg}
            alt={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </div>
      </div>
    </header>
  );
}
