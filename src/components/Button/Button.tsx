import React from 'react';
import styles from './Button.module.scss';

type Props = {
  text: string;
};

export const Button: React.FC<Props> = ({ text }) => {
  return <div className={styles.button}>{text}</div>;
};
