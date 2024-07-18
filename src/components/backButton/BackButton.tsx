import React from 'react';
import Styles from './BackButon.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div onClick={handleClickBack} className={Styles.back}>
      <div className={Styles.back__button}>
        <div className={Styles.back__button__arrow} />
      </div>
      <p className={Styles.back__paragraph} onClick={handleClickBack}>Back</p>
    </div>
  );
};
