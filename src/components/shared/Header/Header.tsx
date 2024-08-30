import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { ToolBar } from '../ToolBar/ToolBar';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Logo } from '../Logo';

export const Header = () => {
  const { isSunSelected } = useContext(GlobalContext);
  const [isOpenMenu, setIsOpenMunu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpenMunu(false);
  }, [location]);

  const handlerMenu = () => {
    setIsOpenMunu(prev => !prev);
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpenMenu]);

  return (
    <div className={styles.header__container}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <Menu isOpenMenu={isOpenMenu} />
      <ToolBar isOpenMenu={isOpenMenu} />

      <div className={styles.burger__menu}>
        {!isOpenMenu ? (
          <button
            onClick={handlerMenu}
            type="button"
            className={styles.burger__menu_open}
          >
            {isSunSelected ? (
              <img src="img/headerIсons/openmenu.svg" alt="burger-open" />
            ) : (
              <img src="img/headerIсons/burger-dark.svg" alt="burger-open" />
            )}
          </button>
        ) : (
          <button
            onClick={handlerMenu}
            type="button"
            className={styles.burger__menu_close}
          >
            {isSunSelected ? (
              <img src="img/headerIсons/closemenu.svg" alt="burger-close" />
            ) : (
              <img
                src="img/headerIсons/close-burger-dark.svg"
                alt="burger-close"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
