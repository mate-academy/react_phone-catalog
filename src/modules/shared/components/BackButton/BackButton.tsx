import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  // works the same way as the browser "Back" button
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => navigate(-1)}
    >
      <Icon name="chevron-left" />
      Back
    </button>
  );
};
