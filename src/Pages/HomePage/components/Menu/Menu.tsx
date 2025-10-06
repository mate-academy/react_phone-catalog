import { Navigation } from '../Navigation';
import styles from './Menu.module.scss';
import favourites from '../../../../shared/images/icones/header-favourites-icon-3x.png';
import basket from '../../../../shared/images/icones/header-basket-icon-3x.png';
import { useContext } from 'react';
import { HeaderContext } from '../../../../context/HeaderContext';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const { menuOpen, setMenuOpen } = useContext(HeaderContext);

  return (
    <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
      <Navigation direction="column" gap="16px" bottom="-8px" />
      <div className={styles.menu__buttons}>
        <Link
          to="/favorites"
          className={styles['menu__icon-container']}
          onClick={() => setMenuOpen(false)}
        >
          <img src={favourites} className={styles.menu__icon} />
        </Link>
        <div className={styles['menu__buttons-line']}></div>
        <Link
          to="/cart"
          className={styles['menu__icon-container']}
          onClick={() => setMenuOpen(false)}
        >
          <img src={basket} className={styles.menu__icon} />
        </Link>
      </div>
    </div>
  );
};
