import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const canGoBack = window.history.length > 1;

  return (
    <button
      onClick={() => navigate(-1)}
      disabled={!canGoBack}
      className={styles.buttonBack}
    >
      Back
    </button>
  );
};
