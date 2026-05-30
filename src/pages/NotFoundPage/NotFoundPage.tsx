import './NotFoundPage.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../images/logo/sliderArrow.svg';

type Props = {
  title: string;
  image: string;
};

export const NotFoundPage: React.FC<Props> = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <div className="notFoundPage">
      <button
        className="notFoundPage__back_button"
        onClick={() => navigate(-1)}
      >
        <img
          src={backArrow}
          alt="Back-button"
          className="notFoundPage__back_button__img"
        />
        <span className="notFoundPage__back_button__text">Back</span>
      </button>

      <div className="notFoundPage__empty">
        <p className="notFoundPage__empty_title">{title}</p>
        <img src={image} alt="not Found" className="notFoundPage__empty_img" />
      </div>
    </div>
  );
};
