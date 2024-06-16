import { useNavigate } from 'react-router-dom';
import styles from './BackLink.module.scss';

export const BackLink = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.backLink} onClick={() => navigate(-1)}>
      Back
    </button>
  );
};
