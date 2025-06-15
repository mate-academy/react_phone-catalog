import React from 'react';
import styles from './HeaderBurger.module.scss';
import classNames from 'classnames';

type Props = {
  toggleBurger: () => void;
  isBurgerActive: boolean;
};

export const HeaderBurger: React.FC<Props> = ({
  toggleBurger,
  isBurgerActive,
}) => {
  return (
    <div className={styles.burger} onClick={toggleBurger}>
      <button
        className={classNames(styles.burger__btn, {
          [styles.active]: isBurgerActive,
        })}
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};
