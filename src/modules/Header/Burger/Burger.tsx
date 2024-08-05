import classNames from 'classnames';
import React, { useEffect } from 'react';
import styles from './Burger.module.scss';

type Props = {
  handleOpenMenu: () => void;
  isOpen: boolean;
};
export const Burger: React.FC<Props> = ({ handleOpenMenu, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body_lock');
    } else {
      document.body.classList.remove('body_lock');
    }

    return () => {
      document.body.classList.remove('body_lock');
    };
  }, [isOpen]);

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
