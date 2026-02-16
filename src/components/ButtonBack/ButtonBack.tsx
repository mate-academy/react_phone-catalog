import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ButtonBack.module.scss';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={style.buttonBack}>
      <button className={style.buttonBackWrapper} onClick={() => navigate(-1)}>
        <img
          src="img/icons/Chevron (Arrow Left).svg"
          alt="back button"
          className={style.buttonBackIcon}
        />
        <p className={style.buttonBackText}>Back</p>
      </button>
    </div>
  );
};
