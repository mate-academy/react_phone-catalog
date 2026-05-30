import styles from './ButtonBack.module.scss';
import { ArrowIcon } from '../icons/Arrow';
import { useNavigate } from 'react-router-dom';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.buttonBack}>
      <ArrowIcon direction="left" />
      <p>Back</p>
    </button>
  );
};
