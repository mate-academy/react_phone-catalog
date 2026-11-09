import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.backButton} ${className}`}
      onClick={() => navigate(-1)}
    >
      <img className={styles.icon} src="./img/icons/ArrowLeft.svg" alt="" />
      Back
    </button>
  );
};
