import React from 'react';
import styles from './PageHeader.module.scss';

type PageHeaderProps = {
  title: string;
  showBreadCrumbs?: boolean;
};
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBreadCrumbs = true,
}) => {
  return <h1 className={styles.pageTitle}>{title}</h1>;
};

export default PageHeader;
