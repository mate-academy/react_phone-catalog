import React from 'react';
import back from './Back.module.scss';
import { useNavigate } from 'react-router-dom';

export const Back: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={back.back}>
      <img
        src="img/icons/arrows/arrow-prev.svg"
        alt="Arrow icon"
        className={back.back__icon}
      />
      <button onClick={handleClick} className={back.back__button}>
        Back
      </button>
    </div>
  );
};
