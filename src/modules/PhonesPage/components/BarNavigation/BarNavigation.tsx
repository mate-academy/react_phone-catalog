import './BarNavigation.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  nameCategory: string;
  nameProduct?: string;
};

export const BarNavigation: React.FC<Props> = ({
  nameCategory,
  nameProduct,
}) => {
  return (
    <div className="bar-navigation">
      <NavLink className="icon--home" to={'/'}></NavLink>
      <div className="icon--arrow-right bar-navigation__icon"></div>
      {nameProduct === undefined ? (
        <div className="text-small secondary bar-navigation__name-category">
          {nameCategory}
        </div>
      ) : (
        <div className="bar-navigation-name">
          <NavLink
            className="text-small bar-navigation__name-category-selected"
            to={`/${nameCategory}`}
          >
            {nameCategory}
          </NavLink>
          <div className="icon--arrow-right bar-navigation__icon"></div>
          <div className="text-small secondary">{nameProduct}</div>
        </div>
      )}
    </div>
  );
};

export default BarNavigation;
