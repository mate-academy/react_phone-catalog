import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Breadcrumbs.module.scss';
import { Typography } from '../../shared/atoms/Typography';

type Props = {
  to: string;
  children: React.ReactNode;
};

export const BreadcrumbLink: React.FC<Props> = ({ to, children }) => (
  <Link to={to} className={styles.text}>
    <Typography variant="small" color="inherit">
      {children}
    </Typography>
  </Link>
);
