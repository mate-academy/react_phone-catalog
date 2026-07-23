import classNames from 'classnames';

import React from 'react';
import styles from '@shared/components/ArrowButton/ArrowBtn.module.scss';
import ArrowIcon from '@public/img/icons/icon-arrow.svg?react';

type Props = {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export const ArrowButton: React.FC<Props> = ({
  direction,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.arrowButton, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowIcon
        className={classNames(styles.icon, {
          [styles.arrowLeft]: direction === 'prev',
          [styles.arrowRight]: direction === 'next',
        })}
      />
    </button>
  );
};
