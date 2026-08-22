import { getImageUrl } from '../../../../utils/getImageUrl';
import styles from './RequestStatus.module.scss';

export const ErrorMessage: React.FC = () => (
  <div className={styles.status} data-cy="error">
    <p className={styles.status__text}>Something went wrong</p>
    <button
      type="button"
      className={styles.status__button}
      onClick={() => window.location.reload()}
    >
      Reload
    </button>
  </div>
);

type EmptyProps = {
  message: string;
  image?: string;
};

export const EmptyMessage: React.FC<EmptyProps> = ({ message, image }) => (
  <div className={styles.status}>
    {image && (
      <img className={styles.status__image} src={getImageUrl(image)} alt="" />
    )}
    <p className={styles.status__text}>{message}</p>
  </div>
);
