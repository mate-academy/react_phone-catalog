import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container} onClick={handleBackClick}>
      <span className={styles.arrow}>
        <img src="img/icons/Arrow_Left.svg" alt="arow_left" />
      </span>
      <div className={styles.backButton}>Back</div>
    </div>
  );
};
