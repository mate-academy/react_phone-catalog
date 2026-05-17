import { useTranslation } from 'react-i18next';
import styles from './NotFoundPages.module.scss';

export const NotFoundPages = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.page}>
      <span className={styles.page__title}>{t('ui.page_is_not_found')}</span>
    </div>
  );
};
