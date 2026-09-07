import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.backButton__container} onClick={handleBack}>
      <div className={styles.backButton__arrow} />
      <div className={styles.backButton__text}>Back</div>
    </div>
  );
};
