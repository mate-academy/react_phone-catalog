import classNames from 'classnames';

import React from 'react';
import styles from './FadeIn.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FadeIn: React.FC<Props> = ({ children, className }) => (
  <div className={classNames(styles.content, className)}>{children}</div>
);
