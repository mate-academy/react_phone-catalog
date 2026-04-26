import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../images/Icons/Logo.svg';
import heart from '../../images/Icons/Heart.svg';
import cart from '../../images/Icons/Cart.svg';
import menu from '../../images/Icons/Menu.png';
import close from '../../images/Icons/Close.png';
import { Navbar } from './Navbar';
import { useContext, useEffect, useState } from 'react';
import { Menu } from './Menu';
import { getClassLink } from '../../utils/getClassLink';
import { SearchBar } from './SearchBar';
import { CartContext } from '../../contexts/cart';
import { FavContext } from '../../contexts/favorites';

export const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavContext);

  useEffect(() => {
    if (menuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuActive]);

  const location = useLocation();

  const isCatalogPage =
    location.pathname.includes('/phones') ||
    location.pathname.includes('/tablets') ||
    location.pathname.includes('/accessories');

  const getLinkClass = getClassLink({
    baseClass: styles.topBar__iconLink,
    activeClass: styles.activeLink,
  });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header__content}>
            <div className={styles.topBar}>
              <div className={styles.topBar__logoContainer}>
                <NavLink className={styles.topBar__logoLink} to="/">
                  <img
                    className={styles.topBar__logo}
                    src={logo}
                    alt="NG logo"
                  />
                </NavLink>
              </div>
              <div className={styles.topBar__navBar}>
                <Navbar onMenuClose={setMenuActive} />
              </div>

              <div className={styles.topBar__sideOptions}>
                {isCatalogPage && <SearchBar />}

                <div className={styles.topBar__icons}>
                  <div className={styles.topBar__iconBlock}>
                    <NavLink className={getLinkClass} to="/favorites">
                      {!!favorites.length && (
                        <div className={styles.topBar__iconCounter}>
                          {favorites.length}
                        </div>
                      )}
                      <img className={styles.topBar__heartImg} src={heart} />
                    </NavLink>
                  </div>
                  <div className={styles.topBar__iconBlock}>
                    <NavLink className={getLinkClass} to="/cart">
                      {!!cartItems.length && (
                        <div className={styles.topBar__iconCounter}>
                          {cartItems.length}
                        </div>
                      )}
                      <img className={styles.topBar__cartImg} src={cart} />
                    </NavLink>
                  </div>
                </div>
              </div>

              <button
                className={styles.topBar__menuBtn}
                onClick={() => setMenuActive(!menuActive)}
              >
                {menuActive ? (
                  <img src={close} alt="Close" />
                ) : (
                  <img src={menu} alt="Menu" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuActive && <Menu onMenuClose={setMenuActive} />}
    </>
  );
};
