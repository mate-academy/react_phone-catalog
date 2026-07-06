import { useNavigate } from 'react-router-dom';
import styles from './BackNavigation.module.scss';
import arrowBack from './img/buttons/arrow.png';

export const BackNavigation = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={styles.backBlock}
    >
      <img className={styles.arrow} src={arrowBack} alt="arrow back" />
      Back
    </button>
  );
};
