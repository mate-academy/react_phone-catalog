import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState } from 'react';
import { SidebarMenu } from './SidebarMenu/SidebarMenu';
import { HeaderIcons } from './HeaderIcons/HeaderIcons';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 639px');

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__items}>
          <div className={styles.header__left}>
            <Link to={{ pathname: '/' }} className={styles.header__link}>
              <div className={styles.header__logo}></div>
            </Link>

            {!isMobile && <Navbar />}
          </div>
          {!isMobile ? (
            <HeaderIcons />
          ) : (
            <>
              {!isOpen ? (
                // eslint-disable-next-line max-len
                <div className={styles.icon__menu} onClick={() => openSidebar()}></div>
              ) : (
                // eslint-disable-next-line max-len
                <div className={styles.icon__close} onClick={() => closeSidebar()}></div>
              )}
            </>
          )}
        </div>

        {isMobile && isOpen && <SidebarMenu />}
      </div>
    </header>
  );
};
