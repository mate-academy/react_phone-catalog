import { useNavigate } from 'react-router-dom';
import styles from './Back.module.scss';

export const Back = () => {
  const navigate = useNavigate();

  const goBack = () => navigate('..', { replace: true });

  return (
    <button type="button" className={styles.back} onClick={goBack}>
      <div className={styles.back__arrow}>
        <img src="./icons/arr_left.svg" />
      </div>
      <span className={styles.back__text}>Back</span>
    </button>
  );
};
