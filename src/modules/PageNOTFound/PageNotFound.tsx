import { TitlePages } from '../../components/title/TitlePages';
import styles from './PageNotFound.module.scss';
export const PageNotFound = () => {
  return (
    <>
      <TitlePages type={'notFound'} />
      <div className={styles.notFoundImage}></div>
    </>
  );
};
