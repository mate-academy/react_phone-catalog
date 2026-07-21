import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  path: string;
};

export const BackButton: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(path)}>
      <img src="img/icons/arrow-left.png" alt="Arrow Left" />
      Back
    </button>
  );
};
