import React from 'react';
import { MainLayout } from '../../layout/MainLayout';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <MainLayout>
    <div className={styles.wrapper}>
      <h1>Page not found</h1>
      <img src="img/page-not-found.png" className={styles.img} />
    </div>
  </MainLayout>
);
