import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../contexts';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navBtn, { [styles.isActiveMenu]: isActive });

const getLinkClassCart = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, styles.cart, { [styles.isActiveCart]: isActive });

export const Header = () => {
  const { cartItems } = useContext(CartContext);

  const totalInCart = cartItems.reduce(acc => acc + 1, 0);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <Link to="/" className={styles.logoLink}>
            <img src="./img/Logo.svg" alt="Nice Gadgets logo" />
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.icons}>
          <div className={styles.iconBox}>
            <Link
              to="#"
              className={`${styles.iconLink} ${styles.favorites}`}
            ></Link>
          </div>
          <div className={styles.iconBox}>
            <NavLink to="/cart" className={getLinkClassCart}></NavLink>
            {totalInCart > 0 && (
              <div className={styles.cartCounter}>{totalInCart} </div>
            )}
          </div>
        </div>

        <div className={`${styles.iconBox} ${styles.mobileMenu}`}>
          <Link to="#" className={styles.iconMobileMenu}></Link>
        </div>
      </header>
    </>
  );
};
