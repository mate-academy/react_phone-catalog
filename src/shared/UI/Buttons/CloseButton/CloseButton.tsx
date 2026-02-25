import React from 'react';
import styles from './CloseButton.module.scss';
import { CloseIcon } from '../../Icon/CloseIcon';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CloseButton: React.FC<Props> = ({ ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <CloseIcon />
    </button>
  );
};
