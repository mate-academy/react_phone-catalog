import React from 'react';
import styles from './DashButton.module.scss';
import cn from 'classnames';

interface Props {
  onClick: () => void;
  isActive: boolean;
}

export const DashButton: React.FC<Props> = ({ onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={cn(styles.dash, { [styles.active]: isActive })}
    ></div>
  );
};
