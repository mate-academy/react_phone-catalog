import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.scss';

type Props = {
  size?: 'small' | 'medium' | 'large';
};

export const Loader: React.FC<Props> = ({ size = 'medium' }) => {
  return (
    <span className={classNames(styles.loader, styles[`loader--${size}`])} />
  );
};
