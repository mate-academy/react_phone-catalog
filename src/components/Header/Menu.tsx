import React from 'react';
import styles from './Menu.module.scss';
import { Navbar } from '../Header/Navbar';
import { Icons } from './Icons';

type Props = {
  onMenuClose: (close: boolean) => void | undefined;
};

export const Menu: React.FC<Props> = ({ onMenuClose }) => {
  return (
    <aside className={styles.menu}>
      <div className={styles.menu__conent}>
        <Navbar onMenuClose={onMenuClose} />
      </div>

      <div className={styles.menu__footer}>
        <Icons />
      </div>
    </aside>
  );
};
