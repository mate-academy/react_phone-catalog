import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { Icon } from '../Icon';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={styles['back-btn']}
      onClick={() => {
        navigate(-1);
      }}
    >
      <Icon type="arrow-left" />
      <span>Back</span>
    </button>
  );
};
