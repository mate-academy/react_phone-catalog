import styles from './BurgerMenu.module.scss';
import logo from '../../../public/img/Nice-Gadgets-logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';

const pages = ['Home', 'Phones', 'Tablets', 'Accessories'];

type Props = {
  isOpen: boolean;
  toggleBurger: (value: any) => void;
};

const BurgerMenu: React.FC<Props> = ({ isOpen, toggleBurger }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.menu}>
      <div className={styles.menu__top}>
        <div className={styles.menu__header}>
          <div className={styles.logo}>
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={styles.menu__hamburger}>
            <Hamburger
              toggled={isOpen}
              toggle={() => toggleBurger(false)}
              size={20}
            />
          </div>
        </div>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__list}>
            {pages.map((page, index) => {
              const link = `/${page.toLowerCase()}`;
              const activePage =
                pathname === link || (pathname === '/' && page === 'Home');

              return (
                <li
                  key={index}
                  className={`${styles.menu__item} ${activePage && `${styles.menu__item_active}`}`}
                >
                  <NavLink to={link}>{page}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={styles.menu__bottom}>
        <Link
          to={`/favourites`}
          className={`${styles.menu__favourites} ${pathname.includes('favourites') && styles.menu__favourites_active}`}
        >
          <img src={`/public/img/icons/favourites-icon.png`} alt="favourites" />
        </Link>
        <Link
          to={`/cart`}
          className={`
            ${styles.menu__cart}
            ${pathname.includes('cart') && styles.menu__cart_active}`}
        >
          <img src={`/public/img/icons/cart-icon.png`} alt="cart" />
        </Link>
      </div>
    </div>
  );
};

export default BurgerMenu;
