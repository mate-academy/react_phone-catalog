import React from 'react';
import styles from './BurgerButton.module.scss';
import { Close } from '../../../Icons/Close';
import { BurgerMenu } from '../../../Icons/BurgerMenu';

type Props = {
  isMenuActive: boolean;
  onChangeIsMenuActive: (v: boolean) => void;
};

export const BurgerButton: React.FC<Props> = ({
  isMenuActive,
  onChangeIsMenuActive,
}) => {
  return (
    <button
      className={styles.BurgerButton}
      onClick={() => onChangeIsMenuActive(!isMenuActive)}
    >
      {isMenuActive ? <Close /> : <BurgerMenu />}
    </button>
  );
};
