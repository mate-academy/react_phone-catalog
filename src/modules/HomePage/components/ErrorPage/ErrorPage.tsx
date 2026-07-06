//#region imports
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/hooks/useTheme';
import styles from './ErrorPage.module.scss';
//#endregion

export const ErrorPage = () => {
  const { t } = useTranslation('homePage');
  const { isDark } = useTheme();

  const img = isDark ? 'img/darkTheme/no-category.png' : 'img/no-category.png';

  return (
    <section className={styles.errorPage} aria-label={t('errorPage')}>
      <h1>{t('somethingWentWrong')}</h1>

      <img src={img} alt="Error Img" className={styles.errorImg} />
    </section>
  );
};
