import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../../_constants/icons';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <div className={styles.backButton__arrow}>
        <ArrowIcon />
      </div>
      <div>Back</div>
    </button>
  );
};
