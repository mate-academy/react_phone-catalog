import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <a href="" className={styles.logo}>
        <img src="img/icons/NiceGadgets-logo.png" alt="Logo" />
      </a>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles['nav-list']}>
            <li className={styles['nav-list__item']}>
              <a href="" className={styles['nav-list__link']}>
                Home
              </a>
            </li>
            <li className={styles['nav-list__item']}>
              <a href="" className={styles['nav-list__link']}>
                Phones
              </a>
            </li>
            <li className={styles['nav-list__item']}>
              <a href="" className={styles['nav-list__link']}>
                Tablets
              </a>
            </li>
            <li className={styles['nav-list__item']}>
              <a href="" className={styles['nav-list__link']}>
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles['header-actions']}>
          <a href="" className={styles['header-actions__link']}>
            <img
              src="img/icons/Vector (Stroke).png"
              alt="Favourites"
              className={styles['header-actions__icon']}
            />
          </a>
          <a href="" className={styles['header-actions__link']}>
            <img
              src="img/icons/Shopping bag (Cart).png"
              alt="Shopping Cart"
              className={styles['header-actions__icon']}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
