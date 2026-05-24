import React from 'react';
import styles from './LikeButton.module.scss';
import { useAppState } from '../../contexts/AppContext';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected: boolean;
};

export const LikeButton: React.FC<Props> = ({ onClick, isSelected }) => {
  const { theme } = useAppState();

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.isSelected : ''}`}
      onClick={onClick}
    >
      <img
        src={`/img/icons/${theme}-theme/Heart${isSelected ? '-selected' : ''}.svg`}
        alt="Heart"
      />
    </button>
  );
};
