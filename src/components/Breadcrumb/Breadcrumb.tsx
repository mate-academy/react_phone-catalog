import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../services/stringHelper';
import './Breadcrumb.scss';

type Props = {
  firstLevel: string;
  secondLevel?: string;
};

export const Breadcrumb: React.FC<Props> = ({ firstLevel, secondLevel }) => {
  return (
    <nav className="breadcrumb">
      <ul className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link to={'/'} className="breadcrumb__home" />
        </li>
        {secondLevel && (
          <li className="breadcrumb__item">
            <div className="breadcrumb__arrow"></div>
            <Link to={`/${secondLevel}`} className="breadcrumb__second">
              {capitalizeFirstLetter(secondLevel)}
            </Link>
          </li>
        )}
        <li className="breadcrumb__item">
          <div className="breadcrumb__arrow"></div>
          <p className="breadcrumb__first">
            {capitalizeFirstLetter(firstLevel)}
          </p>
        </li>
      </ul>
    </nav>
  );
};
