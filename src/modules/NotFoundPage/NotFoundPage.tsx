import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../shared/utils/getTranslation';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { language } = useAppState();
  const t = getTranslation(language);

  return (
    <main className={styles.main}>
      <img
        src="../../public/img/page-not-found.png"
        alt={t.notFoundPage.pageNotFound}
      />
    </main>
  );
};
