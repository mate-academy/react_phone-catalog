import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import styles from './Back.module.scss';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['back-button']} onClick={() => navigate(-1)}>
      <div className={styles['back-button__wrapper']}>
        <Icon name="arrow_left" />

        <div className={styles['back-button__text']}>Back</div>
      </div>
    </div>
  );
};
