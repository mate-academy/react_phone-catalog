import styles from './BackBtn.module.scss';
import { icons } from '../../shared/global/Icons';
import { useNavigate } from 'react-router-dom';

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.backBtn}
      onClick={() => navigate(-1)}
    >
      <span className={styles.backIcon}>{icons.arrowLeft}</span>
      <span className={styles.backText}> Back</span>
    </button>
  );
};
