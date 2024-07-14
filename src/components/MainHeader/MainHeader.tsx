import { useState } from 'react';

import closeIcon from '../../assets/images/CloseMenu.svg';
import menuIcon from '../../assets/images/Menu.svg';

import { cartIcon, favoriteIcon, logo } from '../../assets/index';
import { NavigationButton } from '../../ui/NavigationButton';
import { HeaderNavigation } from '../HeaderNavigation';

import { AsideMenu } from '../AsideMenu';
import styles from './MainHeader.module.scss';

export const MainHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToogleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.Container}>
          <div className={styles.HeaderContent}>
            <div className={styles.HeaderInner}>
              <img className={styles.HeaderLogo} src={logo} alt="logo" />

              <HeaderNavigation />
            </div>

            <div className={styles.HeaderList}>
              <NavigationButton href="/favorites">
                <img
                  className={styles.HeaderIcon}
                  src={favoriteIcon}
                  alt="favorites"
                />
              </NavigationButton>
              <NavigationButton href="/cart">
                <img className={styles.HeaderIcon} src={cartIcon} alt="cart" />
              </NavigationButton>

              <button onClick={handleToogleMenu} className={styles.Button}>
                <img src={showMenu ? closeIcon : menuIcon} alt="cart" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showMenu && <AsideMenu onCloseMenu={handleCloseMenu} />}
    </>
  );
};
