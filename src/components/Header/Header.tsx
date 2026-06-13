import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="img/icons/logo-top.png" alt="Logo" />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/phones" className={styles.link}>
                Phones
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/tablets" className={styles.link}>
                Tablets
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/accessories" className={styles.link}>
                Accessories
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="" className={styles.actionLink}>
            <img
              src="img/icons/Vector (Stroke).png"
              alt="Favourites"
              className={styles.icon}
            />
          </a>
          <a href="" className={styles.actionLink}>
            <img
              src="img/icons/Shopping bag (Cart).png"
              alt="Shopping Cart"
              className={styles.icon}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
