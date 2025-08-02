import React from 'react';
import styles from './NotFoundPage.module.scss';
import { BackButton } from '../shared/atoms/BackButton';
import { PageMessage } from '../shared/molecules/PageMessage';
import { useTranslation } from 'react-i18next';
import { Heading } from '../shared/molecules/Heading';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notfoundpage}>
      <BackButton className={styles.notfoundpage__back} />
      <div className={styles.notfoundpage__content}>
        <Heading title={t('404.title')} />
        <PageMessage
          title={t('404.title')}
          subtitle={t('404.subtitle')}
          imgSrc="images/page-not-found.png"
        />
      </div>
    </div>
  );
};
