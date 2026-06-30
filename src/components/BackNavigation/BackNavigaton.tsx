import { useNavigate } from 'react-router-dom';
import styles from './BackNavigation.module.scss';

export const BackNavigation = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.backBlock}>
      {' '}
      <img src="./img/buttons/button_arrow_back.png" alt="arrow back" /> Back
    </button>
  );
};
