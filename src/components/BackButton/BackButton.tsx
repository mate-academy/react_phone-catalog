import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.btnBack}
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
