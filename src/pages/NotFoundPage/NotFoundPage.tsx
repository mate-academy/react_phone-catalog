import { BackButton } from '../../components/backButton';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notfoundpage}>
      <div className={styles.notfoundpage__content}>
        <img className={styles.notfoundpage__photo} src="img/404.svg" alt="" />
        <h2 className={styles.notfoundpage__title}>
          Oooops! Something went wrong...
        </h2>

        <BackButton />
      </div>
    </div>
  );
};
