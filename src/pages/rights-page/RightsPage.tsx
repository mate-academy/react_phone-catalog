import React, { useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { NotFound } from '../../components/NotFound';
import { useTranslation } from 'react-i18next';
import RightImage from './images/rights-page.jpg';
import styles from './RightsPage.module.scss';

export const RightsPage: React.FC = () => {
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: t('rights') }]} />

        {/* Coming Soon State */}
        <NotFound variant="coming-soon" title={t('rightsComingSoon')} message={t('rightsMessage')} description={t('rightsDescription')} image={RightImage} buttonText={t('backToHome')} buttonLink="/" />
      </div>
    </div>
  );
};
