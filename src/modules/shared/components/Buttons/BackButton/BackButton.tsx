import { useNavigate } from 'react-router-dom';
import styles from '../Button.module.scss';

export const BackButton = ({ fallback = '/phones' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button className={styles.button__back} onClick={handleBack}>
      <div className={styles.button__back__icon} />
      Back
    </button>
  );
};
