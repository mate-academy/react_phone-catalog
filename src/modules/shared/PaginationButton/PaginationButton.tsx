import React from 'react';
import classNames from 'classnames';
import styles from './PaginationButton.module.scss';

type Props = {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
};

export const PaginationButton: React.FC<Props> = ({
  onClick,
  isActive = false,
  children,
}) => {
  return (
    <button
      className={classNames(styles.PaginationButton, {
        [styles.PaginationButton_active]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
