import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <img src="img/ArrowLeft.svg" alt="back" className={styles.arrowLeft} />
      <button onClick={handleBackClick} className={styles.backButton}>
        Back
      </button>
    </div>
  );
};
