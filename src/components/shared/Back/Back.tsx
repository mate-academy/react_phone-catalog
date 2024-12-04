import { useNavigate } from 'react-router-dom';
import styles from './Back.module.scss';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.back} onClick={() => navigate(-1)}>
      <div className={styles.back__wrapper}>
        <div className={styles.back__arrow}></div>
        <p className={styles.back__content}>Back</p>
      </div>
    </div>
  );
};
