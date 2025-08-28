import React, { useEffect } from 'react';
import styles from './Menu.module.scss';
import { HeaderNavigation } from '../HeaderNavigation';
import { HeaderLinks } from '../HeaderLinks';
import { Cart } from '../../../../../types/Cart';
import logo from '../../../../../../public/img/icons/logo.svg';
import close from '../../../../../../public/img/icons/icon-close-black.svg';

type Props = {
  favorites: number[];
  cart: Cart;
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu: React.FC<Props> = ({
  favorites,
  cart,
  isOpenMenu,
  setIsOpenMenu,
}) => {
  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMenu]);

  return (
    <aside className={`${styles.menu} ${isOpenMenu ? styles.menu__show : ''}`}>
      <div className={`${styles.menu__container}`}>
        <div className={`${styles.menu__header} ${styles['header-menu']}`}>
          <div className={`${styles['header-menu__container']}`}>
            <div className={styles['header-menu__logo']}>
              <img src={logo} alt="logo" />
            </div>
            <div
              className={styles['header-menu__close']}
              onClick={() => setIsOpenMenu(false)}
            >
              <img src={close} alt="icon-close" />
            </div>
          </div>
        </div>

        <div className={`${styles.menu__wrapper} container`}>
          <HeaderNavigation
            currentClass={'navigation__items--mobile'}
            setIsOpenMenu={setIsOpenMenu}
          />
        </div>

        <footer className={styles.menu__footer}>
          <HeaderLinks
            favorites={favorites}
            cart={cart}
            customClass={'header__links--mobile'}
            setIsOpenMenu={setIsOpenMenu}
          />
        </footer>
      </div>
    </aside>
  );
};
