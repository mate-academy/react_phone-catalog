import { Link, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { useWidth } from '../../hooks/useWidth';
import styles from './Header.module.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const width = useWidth();

  return (
    <header className={styles.container}>
      <Link to="/" className={`${styles.logo} hover--scale`}>
        <img src={'img/logo.png'} alt="logo" className={styles.logo_img} />
      </Link>

      {width >= 640 ? (
        <div className={styles.nav}>
          <Navigation />
        </div>
      ) : (
        <>
          {pathname.includes('menu') ? (
            <Link to=".." className={styles.icon}>
              <div className="icon icon--close"></div>
            </Link>
          ) : (
            <Link to="/menu" className={styles.icon}>
              <div className="icon icon--menu"></div>
            </Link>
          )}
        </>
      )}
    </header>
  );
};
