import classNames from 'classnames';
import React from 'react';
import styles from './Burger.module.scss';

type Props = {
  handleOpenMenu: () => void;
  isOpen: boolean;
};
export const Burger: React.FC<Props> = ({ handleOpenMenu, isOpen }) => {
  return (
    <button className={styles.header__burger} onClick={handleOpenMenu}>
      <span
        className={classNames(styles.header__lines, {
          [styles.header__lines_open]: isOpen,
        })}
      ></span>
    </button>
  );
};
