import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';

type Props = {
  text: string,
};

export const NotFoundPage: React.FC<Props> = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="container not-found-page">
      <h3 className="title__h3 title__h3--primary">
        {text}
      </h3>
      <button
        type="button"
        className="button button--is-dark not-found-page__button"
        onClick={() => navigate(-1)}
      >
        Return to the previous page
      </button>
    </div>
  );
};
