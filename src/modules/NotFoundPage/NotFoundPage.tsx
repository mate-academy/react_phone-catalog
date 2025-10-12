import { useAppState } from '../../Context/AppContext';
import { getTranslation } from '../Base/utils/getTranslation';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { language } = useAppState();
  const t = getTranslation(language);

  return (
    <main className={styles.main}>
      <img src="./img/page-not-found.png" alt={t.notFoundPage.pageNotFound} />
    </main>
  );
};
