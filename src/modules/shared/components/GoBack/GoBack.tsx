import { useNavigate } from 'react-router-dom';
import styles from './GoBack.module.scss';

export const GoBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.goBack} onClick={() => navigate(-1)}>
      <img src="/img/icons/arrow-back.svg" alt="arrow-back" />
      <span>Back</span>
    </div>
  );
};
