import { useNavigate } from 'react-router-dom';
import styles from './Buttonback.module.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container} onClick={() => navigate(-1)}>
      <img src="img/servic/arrow-left.svg" alt="arrow" />
      <p>Back</p>
    </div>
  );
};
