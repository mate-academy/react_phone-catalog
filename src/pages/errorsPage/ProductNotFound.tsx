import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './errorsPage.module.scss';
import NOT_FOUND from '/img/error/product-not-found.webp';

export const ProductNotFound: FC = () => {
  const { t } = useTranslation();
  const localAlt = t('error.notFound');

  return (
    <section className={styles.image}>
      <img src={NOT_FOUND} alt={localAlt} />
    </section>
  );
};
