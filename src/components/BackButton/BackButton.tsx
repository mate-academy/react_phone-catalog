import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <img
        className={styles.icon}
        src="/img/icons/arrow-left.svg"
        alt="Arrow left"
      />

      <span className={styles.text}>Back</span>
    </button>
  );
};
