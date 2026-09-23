import { useNavigate } from 'react-router-dom';
import { IconChevronLeft } from '../Icons';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.back}
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      <IconChevronLeft className={styles.icon} />
      Back
    </button>
  );
};
