import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={styles.backButton}
    >
      <span className={styles.backButton__icon} aria-hidden="true"></span>
      Back
    </button>
  );
};
