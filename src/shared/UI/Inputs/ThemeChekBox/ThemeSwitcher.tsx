import React, { InputHTMLAttributes } from 'react';
import styles from './ThemeSwitcher.module.scss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const ThemeChekBox: React.FC<Props> = ({ ...props }) => {
  return <input type="checkbox" className={styles.input} {...props} />;
};
