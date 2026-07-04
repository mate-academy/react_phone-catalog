import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.breadcrumbs__back}>
      <span className={styles.breadcrumb__back}></span>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.breadcrumbs__backLink}
      >
        Back
      </button>
    </div>
  );
};
