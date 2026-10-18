import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles['back-button']}
      onClick={() => navigate(-1)}
    >
      <Icon name="arrow-left" />
      Back
    </button>
  );
};
