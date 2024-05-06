import styles from './BackBtn.module.scss';
import { icons } from '../../shared/global/Icons';
import { useLocation, useNavigate } from 'react-router-dom';

export const BackBtn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <button
      type="button"
      className={styles.backBtn}
      onClick={() => navigate({ pathname: '..', search: state?.search })}
    >
      <span className={styles.backIcon}>{icons.arrowLeft}</span>
      <span className={styles.backText}> Back</span>
    </button>
  );
};
