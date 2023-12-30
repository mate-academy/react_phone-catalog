import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.scss';
import button from '../../images/icons/Arrow_left.svg'

export const BackButton: React.FC = () => {
  return (
    <Link to=".." className="Back">
      <img
        src={button}
        alt="Arrow"
        className="Back__icon"
      />
      <p className="Back__text">
        Back
      </p>
    </Link>
  );
};
