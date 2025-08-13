import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import Navigation from './Navigation/Navigation';
import Icon from '../../shared/Icon';
import MobileMenu from './MobileMenu';

export const Header = () => {
  const location = useLocation();
  const [showMobile, setShowMobile] = useState(false);

  const handleMobileMenuClick = () => {
    setShowMobile(!showMobile);
  };

  useEffect(() => {
    setShowMobile(false);
  }, [location.pathname]);

  const menuIconClass = showMobile ? 'close' : 'menu-mobile';

  return (
    <>
      <header
        className={cn(styles.header, {
          [styles['header-mobile']]: showMobile,
        })}
      >
        <div className={styles.nav}>
          <NavLink className={styles.logo} to="/">
            <img className={styles.image} src="img/assets/logo.svg"></img>
          </NavLink>
          <Navigation />
          <div className={styles.buttons}>
            <Icon to="favorites" />
            <Icon to="cart" />
            <Icon to={handleMobileMenuClick} modifier={menuIconClass} />
          </div>
        </div>
        {showMobile && <MobileMenu pathname={location.pathname} />}
      </header>
    </>
  );
};

export default Header;
