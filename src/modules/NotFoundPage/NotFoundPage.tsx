import styles from './NotFoundPage.module.scss';
import { BASE_URL } from '../../utils/const';

const NotFoundPage = () => {
  return (
    <div className={styles.empty}>
      <img
        className={styles.emptyImg}
        src={`${BASE_URL}/img/page-not-found.png`}
        alt="Not Found"
      />
    </div>
  );
};

export default NotFoundPage;
