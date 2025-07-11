import React from 'react';
import styles from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<Props> = ({ className, ...props }) => {
  return <input className={styles.input} {...props} />;
};
