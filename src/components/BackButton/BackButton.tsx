import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.back} type="button" onClick={() => navigate(-1)}>
      <Icon name="left" />
      Back
    </button>
  );
};
