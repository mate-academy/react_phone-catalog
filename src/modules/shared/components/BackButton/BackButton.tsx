import { useNavigate } from 'react-router-dom';

import styles from './BackButton.module.scss';

import { Arrow } from '@components/Arrow';
import { ArrowType } from '@sTypes/ArrowType';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles['back-button']} onClick={() => navigate(-1)}>
      <Arrow
        icon
        type={ArrowType.left}
        small
        hideBorders
        className={styles['back-button__arrow']}
      />

      <div className={styles['back-button__text']}>Back</div>
    </button>
  );
};
