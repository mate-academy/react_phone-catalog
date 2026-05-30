import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  messageKey?: string;
};

export const NotFoundPage: React.FC<Props> = ({ messageKey }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyPage}>
      <div className={styles.imageWrapper}>
        <img src="img/page-not-found.png" alt="Not Found" />
      </div>
      <p>{messageKey ? t(messageKey) : t('notFound.defaultMessage')}</p>
    </div>
  );
};
