import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@components/Icons/ArrowLeftIcon';

import React from 'react';
import cn from 'classnames';
import styles from './BackButton.module.scss';

interface BackButtonProps {
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={cn(styles.back_btn, 'small-text', { className })}
      onClick={() => navigate(-1)}
    >
      <ArrowLeftIcon active={false} />

      <span className={styles.back_btn__name}>Back</span>
    </button>
  );
};
