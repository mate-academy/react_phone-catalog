import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { useTheme } from '../../hooks/useTheme';

export const BackButton = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <img
        src={`/react_phone-catalog/img/icons/arrow-left-${theme}.svg`}
        alt="Back"
        className={styles.icon}
      />
      Back
    </button>
  );
};
