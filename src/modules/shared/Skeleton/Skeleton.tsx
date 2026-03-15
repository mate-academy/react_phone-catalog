import React from 'react';
import styles from './Skeleton.module.scss';

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

export const Skeleton: React.FC<Props> = ({
  width = '100%',
  height = '20px',
  className,
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      style={{ width, height }}
    />
  );
};
