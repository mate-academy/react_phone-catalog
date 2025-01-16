// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { PathNavigation } from '../../../shared/components/PathNavigation';
import styles from './PageNotFoundPage.module.scss';

export const PageNotFoundPage: React.FC = () => {
  const { pageNotFound } = useLanguage().localeTexts;

  return (
    <>
      <PathNavigation path={[pageNotFound]} goBack />

      <main className={styles.PageNotFoundPage}>
        <img
          src="/img/page-infos/page-not-found.png"
          className={styles.Image}
        />
        <h1 className={styles.Title}>{pageNotFound}</h1>
      </main>
    </>
  );
};
