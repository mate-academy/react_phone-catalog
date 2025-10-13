import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className={styles.arrowLeft}>
      <img src="/img/SliderImg/Arrow Left.svg" alt="ArrowLeft" />
      Back
    </button>
  );
};
