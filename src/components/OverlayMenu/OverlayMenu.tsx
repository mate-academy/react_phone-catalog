import { Link, NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import styles from './OverlayMenu.module.scss';
import { classActiveNavLink } from '../Header/Header';

const OverlayMenu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        <li className={styles.pageLink}>
          <NavLink to="/" className={classActiveNavLink}>
            home
          </NavLink>
        </li>
        <li className={styles.pageLink}>
          <NavLink to="/phones" className={classActiveNavLink}>
            phones
          </NavLink>
        </li>
        <li className={styles.pageLink}>
          <NavLink to="/tablets" className={classActiveNavLink}>
            tablets
          </NavLink>
        </li>
        <li className={styles.pageLink}>
          <NavLink to="/accessories" className={classActiveNavLink}>
            accessories
          </NavLink>
        </li>
      </ul>

      <div className={styles.icons}>
        <div className={styles.iconMenu}>
          <Link to="/favorites">
            <img src={`${BASE_URL}/icons/Favorites.svg`} alt="Favorites" />
          </Link>
        </div>
        <div className={styles.iconMenu}>
          <Link to="/cart">
            <img src={`${BASE_URL}/icons/Cart.svg`} alt="Cart" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverlayMenu;
