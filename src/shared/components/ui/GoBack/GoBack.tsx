import { useNavigate } from 'react-router-dom';

import styles from './GoBack.module.scss';

export const GoBack: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" className={styles.goBack} onClick={handleGoBack}>
      <div className={styles.arrow}>
        <img src="img/icons/arrow-back-white.svg" alt="back" />
      </div>
      <span className={styles.text}>Back </span>
    </button>
  );
};
