import { Link } from 'react-router-dom';
import { IconType } from '../../utils/types';
import { Icon } from '../HeaderIcon';

import logo from '../../img/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <img src={logo} alt="page logo" />
          </Link>
          <nav className={styles.header__nav}>
            <ul className={styles.header__nav_list}>
              <li>
                <Link className={styles.header__nav_link} to="/">
                  home
                </Link>
              </li>
              <li>
                <Link className={styles.header__nav_link} to="/phones">
                  phones
                </Link>
              </li>
              <li>
                <Link className={styles.header__nav_link} to="/tablets">
                  tablets
                </Link>
              </li>
              <li>
                <Link className={styles.header__nav_link} to="/accessories">
                  accessories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.header__right}>
          <Icon type={IconType.favourites} href="#" />
          <Icon type={IconType.cart} href="#" />
        </div>
      </header>
      <header className={`${styles.header} ${styles['header--mobile']}`}>
        <a href="#" className={styles.header__logo}>
          <img src={logo} alt="page logo" />
        </a>
        <Icon type={IconType.menu} href="#menu" />
      </header>
    </>
  );
};
