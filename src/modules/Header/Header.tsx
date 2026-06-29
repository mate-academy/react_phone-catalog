import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Navigation from './Navigation/Navigation';
import Icon from '../shared/Icon';
import MobileMenu from './MobileMenu';
import IconWithCounter from './IconWithCounter';
import { useAppSelector } from '../../store/hooks';
import InputSearch from './InputSearch';
import Logo from '../shared/Logo';
import { selectTotalCount } from '../../store/slices/itemsSlice';
import ThemeSwitcher from '../shared/ThemeSwitcher';
import HeaderLangSelect from './HeaderLangSelect';

export const Header = () => {
  const location = useLocation();
  const [showMobile, setShowMobile] = useState(false);
  const favorites = useAppSelector(state => state.favorites);
  const favoritesCount = Object.keys(favorites).length;
  const totalCount = useAppSelector(selectTotalCount);

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
            <Logo />
          </NavLink>
          <Navigation />
          <div className={styles.nav__buttons}>
            <div className={styles.nav__buttonsLinks}>
              <IconWithCounter
                href="favorites"
                count={favoritesCount}
                image={'favorites'}
                mobileMenu
              />
              <IconWithCounter
                href="cart"
                count={totalCount}
                image={'cart'}
                mobileMenu
              />
              <HeaderLangSelect />
              <ThemeSwitcher header={true} />
            </div>
            <Icon
              onClick={handleMobileMenuClick}
              iconStyles={{
                icon: ['type_mobile', 'type_mobile_menu'],
                image: showMobile ? 'close' : 'menu',
              }}
            />
          </div>
        </div>
        {showMobile || <InputSearch />}

        {showMobile && <MobileMenu />}
      </header>
    </>
  );
};

export default Header;
