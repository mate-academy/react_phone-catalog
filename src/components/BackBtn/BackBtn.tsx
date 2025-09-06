import { useNavigate } from 'react-router-dom';
import styles from './BackBtn.module.scss';

export const BackBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.BackBtn} onClick={handleClick}>
      <img
        src="/img/Icons/Buttons/Icons/arrow-left.svg"
        alt="Back"
        className={styles.BackBtn__icon}
      />
      <span className={styles.BackBtn__text}>Back</span>
    </div>
  );
};
