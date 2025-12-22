import React from 'react';
import styles from './PageHeader.module.scss';
import BreadCrumbs from './BreadCrumbs';
import cn from 'classnames';
type PageHeaderProps = {
  title: string;
  showBreadCrumbs?: boolean;
  extraContent?: React.ReactNode;
  variant?: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBreadCrumbs = true,
  extraContent,
  variant = '',
}) => {
  return (
    <div
      className={cn(styles.headerWrapper, {
        [styles[`headerWrapper--${variant}`]]: variant,
      })}
    >
      {showBreadCrumbs && (
        <div className={styles.breadcrumbsWrapper}>
          <BreadCrumbs title={title} />
        </div>
      )}

      {extraContent && (
        <div className={styles.extraContentWrapper}>{extraContent}</div>
      )}
      {variant === 'homePage' ? (
        <h1 className={styles.pageTitle}>{title}</h1>
      ) : (
        <h2 className={styles.pageTitle}>{title}</h2>
      )}
    </div>
  );
};

export default PageHeader;
