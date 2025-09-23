import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__topBarLogo}>
          <Link className={styles.header__niceGadgetsLogo} to="/">
            <img src="/img/Logos/Logo.png" alt="Nice Gadgets logo" />
          </Link>
        </div>
        <nav className={styles.header__Nav}>
          <ul className={styles.header__Navleft}>
            <li>
              <Link to="/" className={styles.header__Home}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.header__Phones}>
                Phones
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.header__Tablets}>
                Tablets
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.header__Accessories}>
                Accessories
              </Link>
            </li>
          </ul>

          <ul className={styles.header__Navright}>
            <li>
              <Link to="/" className={styles.header__Favourites}>
                <img src="/img/Logos/Favourites.png" alt="Favourites" />
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.header__Shopping}>
                <img src="/img/Logos/Shopping.png" alt="Shopping" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
