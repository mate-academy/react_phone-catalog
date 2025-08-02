import React from 'react';
import styles from './Divider.module.scss';
import classNames from 'classnames';

type DividerProps = {
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return <div className={classNames(styles.divider, className)} />;
};
