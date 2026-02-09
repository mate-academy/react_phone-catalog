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
  const favoritesCount = Object.keys(favorites).length;
  const itemsCount = Object.keys(items).length;

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
            <div className={styles.nav__buttonsLinks}>
              <IconWithCounter
                href="favorites"
                count={favoritesCount}
                image={'favorites'}
              />
              <IconWithCounter href="cart" count={itemsCount} image={'cart'} />
            </div>
            <Icon
              onClick={handleMobileMenuClick}
              iconStyles={{
                icon: 'type_mobile',
                image: showMobile ? 'close' : 'menu',
              }}
            />
          </div>
        </div>
        {showMobile && <MobileMenu />}
      </header>
    </>
  );
};

export default Header;
