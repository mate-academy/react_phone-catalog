import React from 'react';
import './NoResults.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string;
  title: string;
};

const NoResults:React.FC<Props> = ({ link, title }) => {
  return (
    <div className="noResults container">
      <div className="noResults__btn-wrap">
        <NavLink to="/home">
          <div className="noResults__go-to-home" />
        </NavLink>

        <div className="noResults__arrow" />
        <span className="noResults__btn-text">{link}</span>
      </div>

      <h2 className="noResults__title">{title}</h2>
      <p>There are no products in this category yet</p>
    </div>
  );
};

export default NoResults;
