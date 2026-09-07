import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PrivacyPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs />
        <BackButton />

        <h1 className={styles.title}>{t('privacyPolicy')}</h1>

        <div className={styles.content}>
          <section>
            <h2>1. {t('privacyIntro')}</h2>
            <p>{t('privacyIntroText')}</p>
          </section>

          <section>
            <h2>2. {t('informationWeCollect')}</h2>
            <p>{t('informationWeCollectText')}</p>
          </section>

          <section>
            <h2>3. {t('howWeUseInfo')}</h2>
            <p>{t('howWeUseInfoText')}</p>
          </section>

          <section>
            <h2>4. {t('dataProtection')}</h2>
            <p>{t('dataProtectionText')}</p>
          </section>

          <section>
            <h2>5. {t('cookies')}</h2>
            <p>{t('cookiesText')}</p>
          </section>

          <section>
            <h2>6. {t('thirdParty')}</h2>
            <p>{t('thirdPartyText')}</p>
          </section>

          <section>
            <h2>7. {t('yourRights')}</h2>
            <p>{t('yourRightsText')}</p>
          </section>

          <section>
            <h2>8. {t('contactUs')}</h2>
            <p>{t('contactUsText')}</p>
          </section>

          <p className={styles.lastUpdated}>
            {t('lastUpdated')}: 30 листопада 2025
          </p>
        </div>
      </div>
    </div>
  );
};
