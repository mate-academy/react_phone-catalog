import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.back}
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      <i className="fas fa-chevron-left"></i>
      <span>Back</span>
    </button>
  );
};
