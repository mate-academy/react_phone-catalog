import styles from './Menu.module.scss';

export const Menu = () => {
  return (
    <>
      <aside className={`${styles.menu} ${styles.page__menu}`} id="menu">
        <div className="container">
          <div className={styles.menu__linksContainer}>
            <a href="" className={styles.menu__link}>
              Home
            </a>
            <a href="" className={styles.menu__link}>
              Phones
            </a>
            <a href="" className={styles.menu__link}>
              Tablets
            </a>
            <a href="" className={styles.menu__link}>
              Accessories
            </a>
          </div>
        </div>

        <div className={styles.menu__buttonsContainer}>
          <a href="" className={styles.menu__favourites}></a>
          <a href="" className={styles.menu__cart}></a>
        </div>
      </aside>
    </>
  );
};
