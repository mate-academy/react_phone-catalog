import React from 'react';
import Styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <p className={Styles.back} onClick={handleClickBack}>
      <img
        src=".\img\svg\arrow_left.svg"
        className={Styles.back__arrow}
        alt="Back"
      />
      Back
    </p>
  );
};
