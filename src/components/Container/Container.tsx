import React from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => (
  <div className={classNames(styles.container, className)}>{children}</div>
);
