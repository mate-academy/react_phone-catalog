import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBackLink = () => {
    navigate(-1);
  };

  return (
    <a className={styles.back} onClick={handleBackLink}>
      <div className={styles.navArrow}></div>
      Back
    </a>
  );
};
