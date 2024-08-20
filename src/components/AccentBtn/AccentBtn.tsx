import React from 'react';
import styles from './AccentBtn.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  onClick?: () => void;
  hasCart?: boolean;
};

export const AccentBtn: React.FC<Props> = ({ text, onClick, hasCart }) => {
  return (
    <button
      className={classNames(styles.btnCart, {
        [styles.added]: hasCart,
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
