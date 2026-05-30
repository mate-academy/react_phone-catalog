import React from 'react';
import { NavLink } from 'react-router-dom';
import './PathToPage.scss';

type Props = {
  arrayPath: string[];
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const PathToPage: React.FC<Props> = ({ arrayPath }) => {
  return (
    <div className="path-to-page">
      <NavLink aria-current="page" to="/">
        <div className="icon-path icon-path--home"></div>
      </NavLink>
      {arrayPath.map((path, index) => (
        <React.Fragment key={index}>
          <div className="icon-path icon-path--next"></div>
          {index < arrayPath.length - 1 ? (
            <NavLink className="title-link" to={`/${path}`}>
              {capitalizeFirstLetter(path)}
            </NavLink>
          ) : (
            <span className="title-link--active title-link">
              {capitalizeFirstLetter(path)}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
