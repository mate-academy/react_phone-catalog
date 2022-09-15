import React from 'react';
import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="BackButton" type="button" onClick={() => navigate(-1)}>
      <i className="icon-Chevron-Arrow-Left BackButton__arrow" />
      Back
    </button>
  );
};
