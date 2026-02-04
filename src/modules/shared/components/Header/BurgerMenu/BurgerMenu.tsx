import { Link, NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { useEffect } from 'react';
import { asset } from '../../../utils/asset';
import { useCart } from '../../../hooks/useCart';
import { useFavorites } from '../../../hooks/useFavorites';

type Props = {
  isBurgerMenuOpen: boolean;
  onClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isBurgerMenuOpen, onClose }) => {
  const { totalQuantity: cartCount } = useCart();
  const { count: favoriteCount } = useFavorites();

  const handleNavigate = () => {
    onClose();
  };

  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isBurgerMenuOpen]);

  return (
    <div
      className={
        isBurgerMenuOpen
          ? `${styles.burgerMenu} ${styles.isOpen}`
          : styles.burgerMenu
      }
    >
      <div className={styles.nav}>
        <NavLink to="/" className={styles.navLink} onClick={handleNavigate}>
          Home
        </NavLink>
        <NavLink
          to={{ pathname: '/phones' }}
          className={styles.navLink}
          onClick={handleNavigate}
        >
          Phones
        </NavLink>
        <NavLink
          to={{ pathname: '/tablets' }}
          className={styles.navLink}
          onClick={handleNavigate}
        >
          Tablets
        </NavLink>
        <NavLink
          to={{ pathname: '/accessories' }}
          className={styles.navLink}
          onClick={handleNavigate}
        >
          Accessories
        </NavLink>
      </div>

      <div className={styles.icons}>
        <Link
          to={{ pathname: '/favorites' }}
          className={styles.iconsLink}
          onClick={handleNavigate}
        >
          <div className={styles.iconBlock}>
            <img
              src={asset('/img/icons/heart.png')}
              className={styles.iconImg}
            ></img>
            {favoriteCount !== 0 && (
              <span className={styles.counter}>{favoriteCount}</span>
            )}
          </div>
        </Link>
        <Link
          to={{ pathname: '/cart' }}
          className={styles.iconsLink}
          onClick={handleNavigate}
        >
          <div className={styles.iconBlock}>
            <img
              src={asset('/img/icons/shopping-cart.png')}
              className={styles.iconImg}
            ></img>
            {cartCount !== 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
