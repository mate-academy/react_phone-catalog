import { Link } from 'react-router-dom';
import styles from './HidenMenu.module.scss';
import { useAppDispatch } from './../../../app/hooks';
import { sethidenMenuIco } from '../../../features/iconsChangerSlice';

export const HidenMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleCloseHidenMenu = () => {
    dispatch(sethidenMenuIco('./icons/burger-menu-ico.svg'));
  };

  return (
    <div id="hidenMenu" className={styles.hidenMenu}>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/"
            >
              HOME
            </Link>
          </li>

          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/"
            >
              PHONES
            </Link>
          </li>

          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/"
            >
              TABLETS
            </Link>
          </li>

          <li className={styles.nav__item}>
            <Link
              onClick={handleCloseHidenMenu}
              className={styles.nav__link}
              to="/"
            >
              ACCESORIES
            </Link>
          </li>
        </ul>
      </nav>

      <footer className={styles.footer}>
        <div className={`${styles.footer__button} ${styles.favourites}`}>
          <Link className={styles.footer__link} to="/">
            <img
              className={styles.footer__icon}
              src="./icons/heart-ico.svg"
              alt="favourite"
            />
          </Link>
        </div>
        <div className={styles.footer__button}>
          <Link className={styles.footer__link} to="/">
            <img
              className={styles.footer__icon}
              src="./icons/basket-ico.svg"
              alt="basket"
            />
          </Link>
        </div>
      </footer>
    </div>
  );
};
