import { Link } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { useWidth } from '../../hooks/useWidth';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { Icons } from './components/Icons/Icons';

export const Header = () => {
  const { darkTheme } = useContext(ProductContext);
  const width = useWidth();

  const getLogoLink = darkTheme ? 'img/logo--white.png' : 'img/logo--dark.png';

  return (
    <header
      className={classNames(`${styles.container}`, {
        darkTheme: darkTheme,
      })}
    >
      <Link to="/" className={`${styles.logo} hover--scale`}>
        <img src={getLogoLink} alt="logo" className={styles.logo_img} />
      </Link>

      {width >= 640 && (
        <div className={styles.nav}>
          <Navigation />
        </div>
      )}

      <Icons />
    </header>
  );
};
