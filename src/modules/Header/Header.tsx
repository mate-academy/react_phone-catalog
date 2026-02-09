import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Navigation from './Navigation/Navigation';
import Icon from '../shared/Icon';
import MobileMenu from './MobileMenu';
import IconWithCounter from './IconWithCounter';
import { useAppSelector } from '../../store/hooks';

export const Header = () => {
  const location = useLocation();
  const [showMobile, setShowMobile] = useState(false);
  const { items, favorites } = useAppSelector(state => state);

  const handleMobileMenuClick = () => {
    setShowMobile(!showMobile);
  };

  useEffect(() => {
    setShowMobile(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', showMobile);

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showMobile]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <NavLink className={styles.nav__logo} to="/">
            <img className={styles.nav__image} src="/img/assets/logo.svg"></img>
          </NavLink>
          <Navigation />
          <div className={styles.nav__buttons}>
            <IconWithCounter
              href="favorites"
              count={Object.keys(favorites).length}
              image={'favorites'}
            />
            <IconWithCounter
              href="cart"
              count={Object.keys(items).length}
              image={'cart'}
            />

            <Icon
              onClick={handleMobileMenuClick}
              iconStyles={{
                icon: 'type_mobile',
                image: showMobile ? 'close' : 'menu',
              }}
            />
          </div>
        </div>
        {showMobile && <MobileMenu pathname={location.pathname} />}
      </header>
    </>
  );
};

export default Header;
