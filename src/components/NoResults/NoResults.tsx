import React from 'react';
import { NavLink } from 'react-router-dom';
import './NoResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => {
  return (
    <div className="NoResults">
      <NavLink
        to="/home"
        className="NoResults__backToHome"
      >
        <span className="BreadCrumbs__span">
          &#60;
        </span>
        Back
      </NavLink>
      <h1 className="NoResults__title">
        {category}
        {' '}
        not found
      </h1>
    </div>
  );
};
