import { useTranslation } from 'react-i18next';
import styles from './HomeMainTitle.module.scss';
const HomeMainTitle = () => {
  const { t } = useTranslation();

  return <h1 className={styles.title}>{t('h1')}</h1>;
};

export default HomeMainTitle;
