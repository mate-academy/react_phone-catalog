import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './errorsPage.module.scss';
import ERROR_IMAGE from '/img/error/page-not-found.webp';

export const NotFound: FC = () => {
  const { t } = useTranslation();
  const localError = t('error.404');

  return (
    <section className={styles.image}>
      <img src={ERROR_IMAGE} alt={localError} />
    </section>
  );
};
