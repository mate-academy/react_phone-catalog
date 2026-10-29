import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => navigate(-1)}
    >
      <img src="img/icons/arrow-left.svg" alt="" width="16" height="16" />
      Back
    </button>
  );
};
