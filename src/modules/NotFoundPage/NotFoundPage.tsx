import styles from './NotFoundPage.module.scss';
import { BackButton } from '../../components/BackButton/BackButton';

export const NotFoundPage = () => {
  return (
    <div className={styles.not_found_page}>
      <BackButton mode="Home" />

      <h1 className={styles.title}>Page not found</h1>
    </div>
  );
};
