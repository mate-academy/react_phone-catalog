import React, { useEffect } from 'react';
import { NotFound } from '../../components/NotFound';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '../../components/Breadcrumb';
import styles from './NotFoundPage.module.scss';
import PageNotFoundImage from './images/page-not-found.jpg';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: t('pageNotFound') }]} />

        <NotFound variant="page-not-found" title={t('pageNotFound')} message={t('pageNotFoundMessage')} description={t('pageNotFoundDescription')} image={PageNotFoundImage} buttonText={t('backToHome')} buttonLink="/" />
      </div>
    </div>
  );
};
