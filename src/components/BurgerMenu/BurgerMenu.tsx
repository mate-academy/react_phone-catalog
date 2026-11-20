import React from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';

import styles from './BurgerMenu.module.scss';

type Props = {
  icon?: string;
  onClick: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ onClick, icon }) => {
  return (
    <button className={styles['burger-menu']} onClick={onClick}>
      {icon ? (
        <IoClose className={styles['burger-menu__icon']} />
      ) : (
        <IoMenu className={styles['burger-menu__icon']} />
      )}
    </button>
  );
};
