import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TermsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs />
        <BackButton />

        <h1 className={styles.title}>{t('termsOfService')}</h1>

        <div className={styles.content}>
          <section>
            <h2>1. {t('termsAcceptance')}</h2>
            <p>{t('termsAcceptanceText')}</p>
          </section>

          <section>
            <h2>2. {t('useOfService')}</h2>
            <p>{t('useOfServiceText')}</p>
          </section>

          <section>
            <h2>3. {t('userResponsibilities')}</h2>
            <p>{t('userResponsibilitiesText')}</p>
          </section>

          <section>
            <h2>4. {t('ordersAndPayments')}</h2>
            <p>{t('ordersAndPaymentsText')}</p>
          </section>

          <section>
            <h2>5. {t('returnsAndRefunds')}</h2>
            <p>{t('returnsAndRefundsText')}</p>
          </section>

          <section>
            <h2>6. {t('limitationOfLiability')}</h2>
            <p>{t('limitationOfLiabilityText')}</p>
          </section>

          <section>
            <h2>7. {t('changesToTerms')}</h2>
            <p>{t('changesToTermsText')}</p>
          </section>

          <p className={styles.lastUpdated}>
            {t('lastUpdated')}: 30 листопада 2025
          </p>
        </div>
      </div>
    </div>
  );
};
