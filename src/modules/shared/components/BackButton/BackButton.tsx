import { useNavigate } from 'react-router-dom';

import styles from './BackButton.module.scss';

import { Arrow } from '@components/Arrow';
import { ArrowType } from '@sTypes/ArrowType';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['back-button']} onClick={() => navigate(-1)}>
      <div className={styles['back-button__arrow']}>
        <Arrow type={ArrowType.left} small hideBorders />
      </div>

      <div className={styles['back-button__text']}>Back</div>
    </div>
  );
};
