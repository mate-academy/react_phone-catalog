import React from 'react';
import classNames from 'classnames';
import styles from '../Breadcrumbs.module.scss';
import { Typography } from '../../shared/atoms/Typography';

type Props = {
  children: React.ReactNode;
  isCurrent?: boolean;
};

export const BreadcrumbText: React.FC<Props> = ({ children, isCurrent }) => (
  <Typography
    variant="small"
    color={isCurrent ? 'secondary' : 'inherit'}
    className={classNames(styles.text, { [styles.currentText]: isCurrent })}
  >
    {children}
  </Typography>
);
