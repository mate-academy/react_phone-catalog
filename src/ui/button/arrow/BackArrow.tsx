import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';

import styles from './BackArrow.module.scss';

export const BackArrow: FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={styles.back}
      type="button"
      title="Go back"
    >
      <ArrowLeftIcon />
      Back
    </button>
  );
};
