import React from 'react';
import Styles from './BackButon.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleclickBack = () => {
    navigate(-1);
  };

  return (
    <div className={Styles.back}>
      <div onClick={handleclickBack} className={Styles.back__button}>
        <div className={Styles.back__button__arrow} /> <p>Back</p>
      </div>
    </div>
  );
};
