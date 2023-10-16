import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/icons/NotFound.svg';
import './NoResults.scss';

type Props = {
  pageName: string,
};

export const NoResults: React.FC<Props> = ({ pageName }) => {
  return (
    <div className="no-results">
      <img
        src={notFound}
        className="no-results__img"
        alt="Page is not implemented"
      />

      <h1 className="no-results__title">
        {`We are sorry, but ${pageName} page is not implemented yet`}
      </h1>

      <Link
        to="/"
        className="no-results__link"
      >
        Home page
      </Link>
    </div>
  );
};
