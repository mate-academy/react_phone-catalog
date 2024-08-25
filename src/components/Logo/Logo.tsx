import React from 'react';
import { Link } from 'react-router-dom';
import { LOCAL_URL } from '../../api/apiProducts';

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${className} logo`}>
      <Link to={`./`}>
        <img
          src={`${LOCAL_URL}/img/Logo.png`}
          alt="Logo"
          className="logo__image"
        />
      </Link>
    </div>
  );
};
