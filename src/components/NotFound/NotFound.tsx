import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notFound.scss';

export type Props = {
  title: string,
};

export const NotFound:React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">{title}</h2>
      </div>
      <button
        className="not-found__button"
        type="button"
        onClick={handleNavigate}
      >
        Go Home
      </button>
    </div>
  );
};
