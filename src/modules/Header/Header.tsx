import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import SharedStyles from '../shared/shared-styles.module.scss';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Logo from '../Logo';
import Menu from '../Menu';

const Header: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [menuActive, setMenuActive] = useState(false);

  function handleMenuOpen() {
    setMenuActive(true);
  }

  useEffect(() => {
    setMenuActive(false);
  }, []);

  return (
    <header className={styles.header}>
      {!isMobile ? (
        <>
          <Logo />
          <ul className={styles.nav}>
            <li className={styles.nav__link}>
              <Link to="/" className="uppercase">
                Home
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="/phones" className="uppercase">
                Phones
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="/tablets" className="uppercase">
                Tablets
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="/accessories" className="uppercase">
                Accessories
              </Link>
            </li>
          </ul>
          <div className={SharedStyles.icons}>
            <Link to="/favorites" className={SharedStyles.iconWrap}>
              <img src="public/img/icons/heart.svg" alt="Heart Icon" />
            </Link>
            <Link to="/cart" className={SharedStyles.iconWrap}>
              <img src="public/img/icons/bag.svg" alt="Bag Icon" />
            </Link>
          </div>
        </>
      ) : (
        <>
          {menuActive ? (
            <Menu setMenuActive={setMenuActive} />
          ) : (
            <>
              <Logo />
              <div className={SharedStyles.iconWrap} onClick={handleMenuOpen}>
                <img src="public/img/icons/BurgerMenu.svg" alt="Burger Icon" />
              </div>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
