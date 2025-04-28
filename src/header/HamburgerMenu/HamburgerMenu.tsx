import { Link, useLocation } from 'react-router-dom';
import styles from './HamburgerMenu.module.scss';
import React, { useEffect, useState } from 'react';

interface IHamburgerMenuProps {
  setMenuOpen: (isOpen: boolean) => void,
}

const HamburgerMenu: React.FC<IHamburgerMenuProps> = ({ setMenuOpen }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string>('/');

  const handleCloseMenu = () => {
    setMenuOpen(false);
  }

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        <li onClick={handleCloseMenu}>
          <Link 
            to="/" 
            className={`${styles.nav__link} ${active === '/' ? styles.active : ''}`}
          >
            HOME
          </Link>
        </li>
        <li onClick={handleCloseMenu}>
          <Link 
            to="/phones" 
            className={`${styles.nav__link} ${active === '/phones' ? styles.active : ''}`}
          >
            PHONES
          </Link>
        </li>
        <li onClick={handleCloseMenu}>
          <Link 
            to="/tablets" 
            className={`${styles.nav__link} ${active === '/tablets' ? styles.active : ''}`}
          >
            TABLETS
          </Link>
        </li>
        <li onClick={handleCloseMenu}>
          <Link 
            to="/accessories" 
            className={`${styles.nav__link} ${active === '/accessories' ? styles.active : ''}`}
          >
            ACCESSORIES
          </Link>
        </li>
      </ul>

        <div className={styles.icons}>
          <div className={styles.icons__link} onClick={handleCloseMenu}>
            <Link to={'/favourites'}>
              <img src="/images/icons/Favourites.png" className={styles.icon} />
            </Link>
          </div>
          <div className={styles.icons__link} onClick={handleCloseMenu}>
            <Link to={'/cart'}>
              <img src="/images/icons/Cart.png" className={styles.icon}/>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default HamburgerMenu;
