import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Back.module.scss';

export const Back = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.back} onClick={() => navigate(state)}>
      <div className={styles.back__wrapper}>
        <div className={styles.back__arrow}></div>
        <p className={styles.back__content}>Back</p>
      </div>
    </div>
  );
};
