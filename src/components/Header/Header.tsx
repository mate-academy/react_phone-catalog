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
              <a href="" className={styles.link}>
                Home
              </a>
            </li>
            <li className={styles.item}>
              <a href="" className={styles.link}>
                Phones
              </a>
            </li>
            <li className={styles.item}>
              <a href="" className={styles.link}>
                Tablets
              </a>
            </li>
            <li className={styles.item}>
              <a href="" className={styles.link}>
                Accessories
              </a>
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
