import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" className={styles.backbutton} onClick={goBack}>
      <img src="img/icons/vector-black.svg" />
      <span className={styles.backbutton__text}> Back</span>
    </button>
  );
};
