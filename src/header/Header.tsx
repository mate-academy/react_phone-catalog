import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import HamburgerMenu from './HamburgerMenu';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>('/');
  const { pathname } = useLocation();
  const cartItems = useTypedSelector(state => state.cart.items);
  const favouritesItems = useTypedSelector(state => state.favourites.items);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.container}>
        <div><img src="./images/logo/Logo.png" className={styles.logo} /></div>

        <ul className={styles.nav}>
          <li>
            <Link to="/" className={`${styles.nav__link} ${active === '/' ? styles.active : ''}`}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/phones" className={`${styles.nav__link} ${active === '/phones' ? styles.active : ''}`}>
              PHONES
            </Link>
          </li>
          <li>
            <Link to="/tablets" className={`${styles.nav__link} ${active === '/tablets' ? styles.active : ''}`}>
              TABLETS
            </Link>
          </li>
          <li>
            <Link to="/accessories" className={`${styles.nav__link} ${active === '/accessories' ? styles.active : ''}`}>
              ACCESSORIES
            </Link>
          </li>
        </ul>

        <div className={styles.icons}>
          <Link to="/favourites" className={`${styles.icons__link} ${active === '/favourites' ? styles.active : ''}`}>
            <img src="./images/icons/Favourites.png"/>
            {favouritesItems.length > 0 && (
              <div>{favouritesItems.length}</div>
            )}
          </Link>
          <Link to="/cart" className={styles.icons__link}>
            <img src="./images/icons/Cart.png"/>
            {cartItems.length > 0 && (
              <div>{cartItems.length}</div>
            )}
          </Link>
        </div>

        <div className={styles.burgerIcon}>
          <button onClick={() => setMenuOpen(prev => !prev)}>
            {menuOpen === true
              ? (
                <img
                  src="./images/icons/Close.png"
                  className={styles.menuImg}
                />
              )
              : (
                <img
                  src="./images/icons/Menu.png"
                  className={styles.menuImg}
                />
              )
            }
          </button>
        </div>
      </div>

      {menuOpen && (
        <HamburgerMenu setMenuOpen={setMenuOpen}/>
      )}
    </>
  );
};

export default Header;
