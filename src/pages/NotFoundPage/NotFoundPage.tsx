/* eslint-disable max-len */
import React from 'react';
import styles from './NotFoundPage.module.scss';
import { EmptyState } from '../../components/EmptyState';
import pageNotFound from '../../../public/img/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <EmptyState
        image={pageNotFound}
        title="Oops! Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
      />
    </div>
  );
};
