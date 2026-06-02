import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

import logo from '../../modules/shared/icons/header/Logo.png';
import fav from '../../modules/shared/icons/header/fav.png';
import cart from '../../modules/shared/icons/header/cart.png';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`pageGrid ${styles.grid}`}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>

          <nav className={styles.nav}>
            <NavLink to="/" className={styles.link}>
              Home
            </NavLink>
            <NavLink to="/phones" className={styles.link}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={styles.link}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={styles.link}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.actions}>
          <NavLink to="/favorites" className={styles.iconButton}>
            <img src={fav} alt="favorites" className={styles.icon} />
          </NavLink>

          <NavLink to="/cart" className={styles.iconButton}>
            <img src={cart} alt="cart" className={styles.icon} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
