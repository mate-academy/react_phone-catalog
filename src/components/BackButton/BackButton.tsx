import React from 'react';
import { Link } from 'react-router-dom';
import arrowBackIcon from '../../images/icons/Arrow_left.svg';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  return (
    <Link to=".." className="Back">
      <img src={arrowBackIcon} alt="Arrow" className="Back__icon" />
      <p className="Back__text">Back</p>
    </Link>
  );
};
