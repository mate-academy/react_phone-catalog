import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { ArrowLeftIcon } from '../icons';

import styles from './BackButton.module.scss';

type Props = {
  className?: string;
};

export const BackButton: React.FC<Props> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key === 'default') {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className={classNames(styles['back-button'], className)}
      onClick={goBack}
    >
      <ArrowLeftIcon className={styles['back-button__icon']} />
      <span className={styles['back-button__text']}>Back</span>
    </button>
  );
};
