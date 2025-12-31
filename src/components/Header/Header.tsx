import { FC } from 'react';

import classNames from 'classnames';
import styles from './Header.module.scss';

import { Logo } from '../Logo';
import { Menu } from '../Menu';
import { SearchButton } from '../SearchButton';

interface Props {
  isActiveMenu?: boolean;
  toggleMenu?: () => void;
}

export const Header: FC<Props> = ({
  isActiveMenu = false,
  toggleMenu = () => {},
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Logo />
      </div>

      <div className={styles.headerNavigation}>
        <Menu />
      </div>

      <div className={styles.btnsWrapper}>
        <SearchButton />
        <button
          className={classNames(styles.headerMenuBtn, {
            [styles.headerMenuBtnActive]: isActiveMenu,
          })}
          onClick={toggleMenu}
        >
          <span></span>
        </button>
      </div>
    </header>
  );
};
