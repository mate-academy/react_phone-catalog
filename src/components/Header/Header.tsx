import { FC } from 'react';

import classNames from 'classnames';
import styles from './Header.module.scss';

import { Logo } from '../Logo';
import { Menu } from '../Menu';

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

      <button
        className={classNames(styles.headerMenuBtn, {
          [styles.headerMenuBtnActive]: isActiveMenu,
        })}
        onClick={toggleMenu}
      >
        <span></span>
      </button>
    </header>
  );
};
