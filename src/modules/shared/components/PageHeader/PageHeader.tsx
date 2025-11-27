import React from 'react';
import styles from './PageHeader.module.scss';
import BreadCrumbs from './BreadCrumbs';

type PageHeaderProps = {
  title: string;
  showBreadCrumbs?: boolean;
};
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBreadCrumbs = true,
}) => {
  return (
    <div>
      {showBreadCrumbs && <BreadCrumbs title={title} />}
      <h1 className={styles.pageTitle}>{title}</h1>
    </div>
  );
};

export default PageHeader;
