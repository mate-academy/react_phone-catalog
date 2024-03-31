import { Link, useLocation } from 'react-router-dom';
import './Path.scss';
import React from 'react';

type Props = {
  name?: string;
};

export const Path: React.FC<Props> = ({ name }) => {
  const { pathname } = useLocation();
  const path = pathname.slice(1).split('/')[0];
  const normalizedPath = path[0].toUpperCase() + path.slice(1);

  return (
    <div className="path">
      <Link to="/">
        <div className="icon icon--home" />
      </Link>
      <div className="icon icon--arrow-right-disabled" />

      {name ? (
        <div className="path__part">
          <Link to={`/${path}`} className="path__link">
            {normalizedPath}
          </Link>
          <div className="icon icon--arrow-right-disabled" />
          <p className="path__text">
            {name}
          </p>
        </div>
      ) : (
        <p className="path__text">
          {normalizedPath}
        </p>
      )}
    </div>
  );
};

Path.defaultProps = {
  name: '',
};
