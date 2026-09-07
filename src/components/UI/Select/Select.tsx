import React from 'react';
import styles from './Select.module.scss';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export const Select: React.FC<Props> = ({ className, ...props }) => {
  return <select className={styles.select} {...props} />;
};
