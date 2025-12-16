import React from 'react';
import styles from './Skeleton.module.scss';

type Props = {
  className?: string;
  rounded?: boolean;
};

export const Skeleton: React.FC<Props> = ({ className = '', rounded }) => {
  const roundedClass = rounded ? styles.rounded : '';

  return <span className={`${styles.skeleton} ${roundedClass} ${className}`} />;
};
