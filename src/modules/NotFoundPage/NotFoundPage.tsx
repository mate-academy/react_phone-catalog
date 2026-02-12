import { asset } from '../shared/utils/asset';
import styles from './NotFoundPage.module.scss';

type Props = {
  type?: string;
};

export const NotFoundPage: React.FC<Props> = ({ type = 'page' }) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2 className={styles.title}>{type} not found</h2>
      </div>
      <div className={styles.imgBlock}>
        <img
          src={asset(`/img/${type}-not-found.png`)}
          alt="Page not found"
          className={styles.img}
        />
      </div>
    </div>
  );
};
