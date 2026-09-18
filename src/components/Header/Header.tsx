import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useStore } from '../../context/StoreContext';
import styles from './Header.module.scss';

export const Header = () => {
  const { cart, favorites } = useStore();

  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__link, {
      [styles['header__link--active']]: isActive,
    });

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          NICE GADGETS
        </Link>

        <nav className={styles.header__nav}>
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>

        <div className={styles.header__actions}>
          <NavLink to="/favorites" className={styles.header__icon}>
            <i className="far fa-heart"></i>
            {totalFavorites > 0 && (
              <span className={styles.header__badge}>{totalFavorites}</span>
            )}
          </NavLink>
          <NavLink to="/cart" className={styles.header__icon}>
            <i className="fas fa-shopping-bag"></i>
            {totalCartQuantity > 0 && (
              <span className={styles.header__badge}>{totalCartQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
