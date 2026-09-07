import React, { InputHTMLAttributes } from 'react';
import styles from './CheckBox.module.scss';

interface InputCheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const CheckBox: React.FC<InputCheckBoxProps> = ({ ...props }) => {
  return <input type="checkbox" {...props} className={styles.input} />;
};
