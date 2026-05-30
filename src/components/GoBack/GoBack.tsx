import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../assets/icons/arrow/leftWhite.svg';
import styles from './GoBack.module.scss';

export const GoBack: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.back} onClick={handleGoBack}>
      <div className={styles.back__icon}>
        <img src={ArrowLeft} alt="Arrow Left" />
      </div>
      <span className={styles.back__text}>Back</span>
    </div>
  );
};
