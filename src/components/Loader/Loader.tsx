import { useT } from '../../context/LanguageContext';
import styles from './Loader.module.scss';

export const Loader = () => {
  const t = useT();
  return (
    <div className={styles.wrap} role="status" aria-label={t('common.loading')}>
      <div className={styles.spinner} />
    </div>
  );
};
