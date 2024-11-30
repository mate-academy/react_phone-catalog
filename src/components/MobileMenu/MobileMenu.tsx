import { Link, NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import icons from '../../assets/icons/icons.svg';
import classNames from 'classnames';
import { ProductsContext } from '../../store/ProductsContext';
import { useContext } from 'react';
import CartIcon from '../Counter/Counter';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.mobileMenuNavLink} ${styles.active}`
    : styles.mobileMenuNavLink;

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { cart, favorites } = useContext(ProductsContext);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <aside
      className={classNames(styles.mobileMenu, { [styles.active]: isOpen })}
    >
      <nav className={styles.mobileMenuNav}>
        <NavLink to="/" className={getNavLinkClassName} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getNavLinkClassName} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={getNavLinkClassName}
          onClick={onClose}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={getNavLinkClassName}
          onClick={onClose}
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.mobileMenuIconWrapper}>
        <Link
          to="/catalog"
          onClick={onClose}
          className={styles.mobileFavouriteBtn}
        >
          <svg className={styles.icon}>
            <use href={`${icons}#header-icon-header`}></use>
          </svg>
          <CartIcon itemCount={favoritesCount} />
        </Link>
        <Link to="/cart" onClick={onClose} className={styles.mobileCartIcon}>
          <svg className={styles.icon}>
            <use href={`${icons}#shopping-bag-icon`}></use>
          </svg>
          <CartIcon itemCount={itemCount} />
        </Link>
      </div>
    </aside>
  );
};
