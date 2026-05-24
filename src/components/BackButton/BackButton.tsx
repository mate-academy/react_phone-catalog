import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.back}
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      <img src="img/icons/arrow-left.svg" alt="Back" />
      <span>Back</span>
    </button>
  );
};
