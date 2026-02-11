import { Navigation } from '../Navigation';

import styles from './Menu.module.scss';
import React from 'react';
import { Actions } from '../Actions';

interface Props {
  className?: string;
}

export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <aside className={`${styles.menu} ${className}`}>
      <Navigation className={styles.menu__navigation} />

      <Actions className={styles.menu__actions} />
    </aside>
  );
};
