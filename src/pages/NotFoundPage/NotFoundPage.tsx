import './NotFoundPage.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
          src="src\images\logo\sliderArrow.svg"
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
