import React from 'react';
import styles from './NavigationButton.module.scss';
import { useNavigate } from 'react-router-dom';

import arrowLeftIcon from '../../../assets/icons/ChevronArrowLeft.svg';

type Props = {
  title: string;
};
export const NavigationButton: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <img src={arrowLeftIcon} alt="Chevron Arrow Back" />
      <span className={styles.text}>{title}</span>
    </button>
  );
};
