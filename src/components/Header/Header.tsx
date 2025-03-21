import styles from './Header.module.scss';
import logo from '../../../public/img/Nice-Gadgets-logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';

const pages = ['Home', 'Phones', 'Tablets', 'Accessories'];

const userPages = ['favourites', 'cart'];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <div className={styles.logo}>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            {pages.map((page, index) => {
              const link = `/${page.toLowerCase()}`;
              const activePage =
                pathname === link || (pathname === '/' && page === 'Home');

              return (
                <li
                  key={index}
                  className={`${styles.header__nav__list__item} ${activePage && `${styles.header__nav__list__item_active}`}`}
                >
                  <NavLink to={link}>{page}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={styles.header__right}>
        {userPages.map((page, index) => {
          console.log(page, 'page');
          console.log(pathname, 'pathname');

          const isActivePage = pathname.includes(page);

          return (
            <Link
              to={`/${page}`}
              key={index}
              className={`${styles.header__right_block} ${isActivePage && styles.header__right_block_active}`}
            >
              <img src={`/public/img/icons/${page}-icon.png`} alt={page} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
