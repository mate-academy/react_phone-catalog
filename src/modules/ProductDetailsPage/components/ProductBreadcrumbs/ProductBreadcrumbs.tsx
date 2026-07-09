import { Link } from 'react-router-dom';
import styles from './ProductBreadcrumbs.module.scss';
import { Icon } from '../../../../components/Icon';
import React from 'react';
import classNames from 'classnames';

interface Props {
  category: string;
  name: string;
}

export const ProductBreadcrumbs: React.FC<Props> = ({ category, name }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" title="Home">
        <Icon variant="home" />
      </Link>

      <div className={styles.breadcrumbArrow} aria-hidden="true">
        <Icon variant="arrow-right" />
      </div>

      <Link to={`/${category}`} className={classNames(styles.categoryLink, 'small-text')}>
        {category}
      </Link>

      <div className={styles.breadcrumbArrow} aria-hidden="true">
        <Icon variant="arrow-right" />
      </div>

      <span className={classNames(styles.breadcrumbCurrent, 'small-text')} aria-current="page">
        {name}
      </span>
    </nav>
  );
};
