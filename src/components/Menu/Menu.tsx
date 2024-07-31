import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Menu.module.scss';

export const Menu = () => {
  const { state } = useLocation();
  const { pathname }: { pathname: string } = state;

  const addNavLinkClass = useCallback(
    (defaultPath: string): string =>
      classNames(styles.navLink, {
        [styles.navLinkActive]: pathname === defaultPath,
      }),
    [pathname],
  );

  const addIconLinkHeartClass = useCallback(
    (): string =>
      classNames(styles.iconLink, styles.iconLinkHeart, {
        [styles.iconLinkActive]: pathname === '/favourites',
      }),
    [pathname],
  );

  const addIconLinkCartClass = useCallback(
    () =>
      classNames(styles.iconLink, styles.iconLinkCart, {
        [styles.iconLinkActive]: pathname === '/cart',
      }),
    [pathname],
  );

  return (
    <div className={styles.menu}>
      <div>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <Link className={styles.logoLink} to={pathname}>
              <img
                className={styles.logoImg}
                src="img/icons/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>

          <div className={styles.iconClose}>
            <div className={styles.topVerticalLine}></div>
            <Link className={classNames(styles.iconCloseLink)} to={pathname} />
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link className={addNavLinkClass('/')} to="/">
                home
              </Link>
            </li>
            <li>
              <Link className={addNavLinkClass('/phones')} to="/phones">
                phones
              </Link>
            </li>
            <li>
              <Link className={addNavLinkClass('/tablets')} to="/tablets">
                tablets
              </Link>
            </li>
            <li>
              <Link
                className={addNavLinkClass('/accessories')}
                to="/accessories"
              >
                accessories
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottomBarIcons}>
        <div className={classNames(styles.icon, styles.iconHeart)}>
          <Link className={addIconLinkHeartClass()} to="/favourites">
            <div className={classNames(styles.iconCounter)}>5</div>
          </Link>
        </div>

        <div className={styles.bottomVerticalLine}></div>

        <div className={classNames(styles.icon, styles.iconCart)}>
          <Link className={addIconLinkCartClass()} to="/cart">
            <div className={classNames(styles.iconCounter, styles.hidden)}>
              5
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
