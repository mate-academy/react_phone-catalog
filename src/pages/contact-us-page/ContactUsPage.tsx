import React, { useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { NotFound } from '../../components/NotFound';
import { useTranslation } from 'react-i18next';
import ContactUs from './images/contacts page.jpg';
import styles from './ContactUs.module.scss';

export const ContactsPage: React.FC = () => {
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: t('contacts') }]} />

        {/* Coming Soon State - USE NotFound COMPONENT */}
        <NotFound variant="coming-soon" title={t('contactsComingSoon')} message={t('contactsMessage')} description={t('contactsDescription')} image={ContactUs} buttonText={t('backToHome')} buttonLink="/" />
      </div>
    </div>
  );
};
