import { useNavigate } from 'react-router-dom';
import React from 'react';
import './NotResults.scss';

type Props = {
  categoryName: string;
};

export const NotResults: React.FC<Props> = ({ categoryName }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/');

  return (
    <div className="not-res">
      <div className="not-res__title">{`${categoryName} not found`}</div>
      <button
        className="not-res__button button"
        type="button"
        onClick={handleNavigate}
      >
        Go Home
      </button>
    </div>
  );
};
