import Logo from '../../../assets/images/Logo.svg';
import CloseIcon from '../../../assets/icons/header_icons/Close.svg';
import Favorites from '../../../assets/icons/header_icons/Favourites.svg';
import ShoppingBag from '../../../assets/icons/header_icons/ShoppingBag.svg';
import styles from './BurgerMenu.module.scss';
import { Link } from 'react-router-dom';
import { IconItem } from '../IconItem/IconItem';

interface Props {
  onClose: () => void;
  favoritesCount: number;
  cartItemsCount: number;
}

export const BurgerMenu: React.FC<Props> = ({
  onClose,
  favoritesCount,
  cartItemsCount,
}) => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__top}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" />
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src={CloseIcon} alt="Close" />
        </button>
      </div>

      <nav className={styles.nav}>
        <div className={`${styles.nav__item} ${styles.active}`}>
          <Link to="/" onClick={onClose}>
            home
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link to="/phones" onClick={onClose}>
            phones
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link to="/tablets" onClick={onClose}>
            tablets
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link to="/accessories" onClick={onClose}>
            accessories
          </Link>
        </div>
      </nav>

      <div className={styles.buttons}>
        <Link to="/favorites" className={styles.menu__button} onClick={onClose}>
          <IconItem
            count={favoritesCount}
            img={Favorites}
            imgSubtitle="Favorites"
          />
        </Link>
        <Link to="/cart" className={styles.menu__button} onClick={onClose}>
          <IconItem
            count={cartItemsCount}
            img={ShoppingBag}
            imgSubtitle="Shopping Bag"
          />
        </Link>
      </div>
    </div>
  );
};
