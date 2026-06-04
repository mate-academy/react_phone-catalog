import React from 'react';

import styles from './ArrowButton.module.scss';

import { ArrowIcon } from '../ArrowIcon';

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  arrowClassName?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  arrowClassName = '',
  className = '',
  ...rest
}) => {
  return (
    <button className={`${styles.arrowButton} ${className}`} {...rest}>
      <ArrowIcon className={`${arrowClassName} ${styles.arrowIcon}`} />
    </button>
  );
};
