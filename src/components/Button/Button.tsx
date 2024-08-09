import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
  text: string;
};

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <div className={classNames(styles.button, 'text-buttons')}>{text}</div>
  );
};
