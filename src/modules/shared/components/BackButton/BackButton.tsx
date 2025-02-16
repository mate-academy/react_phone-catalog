import { useNavigate } from 'react-router-dom';

import styles from './BackButton.module.scss';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles['back-button']} onClick={() => navigate(-1)}>
      <IconButton
        icon
        type={IconButtonType.arrowLeft}
        small
        hideBorders
        className={styles['back-button__arrow']}
      />

      <div className={styles['back-button__text']}>Back</div>
    </button>
  );
};
