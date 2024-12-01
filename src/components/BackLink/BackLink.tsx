import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../images/icons/arrow_left.svg';
import styles from './BackLink.module.scss';

export const BackLink = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.back}>
      <div className={styles.back__arrow}>
        <img src={arrowLeft} alt="arrow" className={styles.back__img} />
      </div>

      <button onClick={() => navigate(-1)} className={styles.back__link}>
        Back
      </button>
    </div>
  );
};
