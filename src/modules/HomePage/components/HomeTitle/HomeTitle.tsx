import { useTranslation } from 'react-i18next';
import styles from './HomeTitle.module.scss';

export const HomeTitle = () => {
  const { t } = useTranslation();
  return (
    <>
      <title className={styles.hiden}>Product Catalog</title>

      <h1 className={styles.title}>{t('home_page.title')}</h1>
    </>
  );
};
