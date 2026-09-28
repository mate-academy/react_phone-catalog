import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './BackButton.module.scss';

interface Props {
  to?: string;
}

export const BackButton: React.FC<Props> = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      <Icon name="chevron-left" size={16} />
      Back
    </button>
  );
};
