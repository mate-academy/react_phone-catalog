import React from 'react';
import classNames from 'classnames';
import styles from './RoundColorButton.module.scss';

type RoundColorButtonProps = {
  color: string;
  isSelected: boolean;
  onClick: () => void;
};

export const RoundColorButton: React.FC<RoundColorButtonProps> = ({
  color,
  isSelected,
  onClick,
}) => {
  return (
    <li className={styles['round-color-btn']} onClick={onClick}>
      <div
        className={classNames(styles['round-color-btn__outer'], {
          [styles['round-color-btn__outer--selected']]: isSelected,
        })}
      >
        <div
          className={styles['round-color-btn__inner']}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </li>
  );
};
