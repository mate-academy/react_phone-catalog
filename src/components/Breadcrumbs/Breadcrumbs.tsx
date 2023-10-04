import { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { editProductName } from '../../helpers/editProductName';
import './Breadcrumbs.scss';

export const Breadcrumbs: FC = () => {
  const location = useLocation().pathname;
  const breadcrumbsArr = location.slice(1).split('/');

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link className="breadcrumbs__homelink" to="/">
        <img src="icons/home.svg" alt="link to home page" />
      </Link>

      {breadcrumbsArr.map(value => (
        <NavLink className="breadcrumbs__page-name" key={value} to={`/${value}`}>
          <img
            className="breadcrumbs__arrow"
            src="icons/rightArrow.svg"
            alt="arrow icon"
          />
          {editProductName(value)}
        </NavLink>
      ))}
    </div>
  );
};
