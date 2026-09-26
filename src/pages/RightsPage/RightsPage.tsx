import styles from './RightsPage.module.scss';
import { useLanguage } from '../../components/context/LanguageContext';

export const RightsPage = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.rights}>
      <h2 className={styles.title}>{t('copyright&Legal')}</h2>
      <p className={styles.paragraph}>
        {t('Copyright')} © 2026 {t('LidiiaShvets')}.
      </p>
      <p className={styles.paragraph}>{t('ThisProject')}.</p>
      <p className={styles.paragraph}>{t('AllProducts')}.</p>
    </div>
  );
};
