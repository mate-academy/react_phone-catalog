import React from 'react';
import styles from './PaginationButton.module.scss';
import cn from 'classnames';

interface Props {
  page: number | string;
  selected?: boolean;
  classNames?: string;
  onClick?: () => void;
}

export const PaginationButton: React.FC<Props> = ({
  page,
  selected,
  classNames,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={cn(styles.button, classNames, {
      [styles.selected]: selected,
    })}
  >
    {page}
  </button>
);
