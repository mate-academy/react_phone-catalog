import { Link } from 'react-router-dom';
import { LOCAL_URL } from '../../api/apiProducts';
import './Logo.scss';
import React from 'react';

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${className} logo`}>
      <Link to={`./`}>
        <img
          src={`${LOCAL_URL}/icons/Logo.svg`}
          alt="Logo"
          className="logo__image"
        />
      </Link>
    </div>
  );
};
