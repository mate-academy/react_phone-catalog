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
  return (
    <div>
      {showBreadCrumbs && (
        <nav className={styles.breadcrumbs}>
          <a href="/">Home</a> / <span>{title}</span>
        </nav>
      )}
      <h1 className={styles.pageTitle}>{title}</h1>
    </div>
  );
};

export default PageHeader;
