import React from 'react';
import styles from '../Breadcrumbs.module.scss';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  clickable?: boolean;
};

export const BreadcrumbItem: React.FC<Props> = ({ children, clickable }) => (
  <li
    className={classNames(
      styles.item,
      clickable ? styles.clickable : styles.default,
    )}
  >
    {children}
  </li>
);
