import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <img
        src="/react_phone-catalog/img/icons/arrow-left.svg"
        alt="Back"
        className={styles.icon}
      />
      Back
    </button>
  );
};
