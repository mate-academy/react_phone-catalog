import styles from './Header.module.scss';
import logo from '../../images/phone-catalog-logo-3x.png';
import menu from '../../images/icones/header-burger-menu-3x.png';
import basket from '../../images/icones/header-basket-icon-3x.png';
import favourites from '../../images/icones/header-favourites-icon-3x.png';
import close from '../../images/icones/header-close-icon.png';

import { useContext } from 'react';
import { HeaderContext } from '../../../context/HeaderContext';
import { Navigation } from '../../../Pages/HomePage/components/Navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { FavoritesContext } from '../../../context/FavoritesContext';

export const Header = () => {
  const { menuOpen, setMenuOpen } = useContext(HeaderContext);
  const { items: cartItems } = useContext(CartContext);
  const { items: favItems } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__navigation}>
        <img
          className={styles.header__logo}
          src={logo}
          onClick={() => navigate('/home')}
        />
        <Navigation direction="row" hidden={true} />
      </div>
      <img
        className={`${styles.header__icon} ${styles.header__menu}`}
        src={menuOpen ? close : menu}
        onClick={handleOpenMenu}
      />
      <div className={styles.header__icons}>
        <div
          style={{ cursor: 'pointer' }}
          className={styles['header__basket-wrapper']}
          onClick={() => navigate('/cart', { state: { prev: pathname } })}
        >
          <img className={styles.header__icon} src={basket} />
          {cartItems.length !== 0 && (
            <div className={styles.header__circle}>
              <span style={{ fontSize: '9px', color: '#fff' }}>
                {cartItems.length}
              </span>
            </div>
          )}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          className={styles['header__favourites-wrapper']}
          onClick={() => navigate('/favorites')}
        >
          <img className={styles.header__icon} src={favourites} />
          {favItems.length !== 0 && (
            <div className={styles.header__circle}>
              <span style={{ fontSize: '9px', color: '#fff' }}>
                {favItems.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
