import { useNavigate } from 'react-router-dom';
import { ArrowUpIcon } from '../Icons';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.backButton}>
      <span className="icon icon--left">
        <ArrowUpIcon />
      </span>
      Back
    </button>
  );
};
