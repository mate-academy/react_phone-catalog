import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import { useMenu } from '../../context/MenuContext';

const Sidebar: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <aside className={styles.sideMenu} id="burger-menu">
        <HeaderLogoMenu />

        <nav className={styles.sideMenu__nav}>
          <ul className={styles['sideMenu__nav-list']}>
            <li className={styles['sideMenu__nav-item']}>
              <Link
                className={styles['sideMenu__nav-link']}
                to="/"
                onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
              >
                home
              </Link>
            </li>
            <li className={styles['sideMenu__nav-item']}>
              <Link
                className={styles['sideMenu__nav-link']}
                to="/phones?quantity=16&sort=newest"
                onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
              >
                phones
              </Link>
            </li>
            <li className={styles['sideMenu__nav-item']}>
              <Link
                className={styles['sideMenu__nav-link']}
                to="/tablets?quantity=16&sort=newest"
                onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
              >
                tablets
              </Link>
            </li>
            <li className={styles['sideMenu__nav-item']}>
              <Link
                className={styles['sideMenu__nav-link']}
                to="/accessories?quantity=16&sort=newest"
                onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
              >
                accessories
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actionsContainer}>
          <div className={styles.heartWrapper}>
            <Link
              to="favorites"
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            >
              <img src="./img/favourites-(heart-like).svg" alt="heart" />
            </Link>
          </div>

          <div className={styles.bagWrapper}>
            <Link
              to="cart"
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            >
              <img src="./img/shopping-bag-cart.svg" alt="bag" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
