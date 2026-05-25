import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <a href="/">
            <img
              className={styles.logo}
              src="/img/icons/logo.svg"
              alt="Page Logo"
            />
          </a>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a href="#" className={styles.link}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Phones
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Tablets
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.icons}>
          <div>
            <a
              className={styles.iconLink}
              href="/favorites"
              aria-label="Favorites"
            >
              <img src="/img/icons/favorites.svg" alt="Favorites" />
            </a>
          </div>

          <div>
            <a
              className={styles.iconLink}
              href="/shopping-bag"
              aria-label="Shopping bag"
            >
              <img src="/img/icons/shopping-bag.svg" alt="Shopping bag" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
