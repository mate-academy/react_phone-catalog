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
      <button onClick={handleclickBack} className={Styles.back__button}>Go Back</button>
    </div>
  );
};
