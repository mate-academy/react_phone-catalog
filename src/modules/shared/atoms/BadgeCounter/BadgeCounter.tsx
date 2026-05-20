import React from 'react';
import styles from './BadgeCounter.module.scss';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const BadgeCounter: React.FC<Props> = ({ children, className }) => {
  return (
    <span className={classNames(styles.badgecounter, className)}>
      {children}
    </span>
  );
};
