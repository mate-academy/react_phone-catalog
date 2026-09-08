import { useNavigate } from 'react-router-dom';
import styles from './BackBtn.module.scss';
import backIcon from '/icons/back-icon.png';

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.backBtn} onClick={() => navigate(-1)}>
      <img src={backIcon} alt="backIcon" />
      Back
    </button>
  );
};
