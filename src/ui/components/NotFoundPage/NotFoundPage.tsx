import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '../../base';

import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate('/home');
  };

  return (
    <div className="not-found">
      <div className="not-found__image-container">
        <img src="./img/no-page-found.jpg" alt="No Products Found" />
      </div>
      <Typography type="title" level="1" textAlign="center">
        Page not found
      </Typography>
      <Button
        type="primary"
        className="not-found__button"
        onClickHandler={handleClickBackButton}
      >
        Back to the home
      </Button>
    </div>
  );
};
